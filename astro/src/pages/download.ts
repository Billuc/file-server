import type { APIRoute } from "astro";
import { db, File as DbFile } from "astro:db";
import { eq } from "astro:db";
import { InternalError } from "@/utils/InternalError";
import { promises as fs } from "fs";
import { getFilePath, fileExists } from "../utils/fileUtils";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extract the key from form data
    const formData = await request.formData();
    const key = formData.get("key")?.toString();
    const enc = formData.get("enc")?.toString();

    if (!key) {
      return new Response(JSON.stringify({ error: "No key provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the file metadata from the database
    const file = await db.select().from(DbFile).where(eq(DbFile.id, key)).get();

    if (!file) {
      throw new InternalError(404, "File Not Found");
    }

    // Check if file has expired
    const now = new Date();
    if (file.expiresAt && now > file.expiresAt) {
      throw new InternalError(410, "File has expired");
    }

    // Check password if required
    if (file.password && file.password !== enc) {
      return new Response(JSON.stringify({ error: "Password is incorrect" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if file exists on filesystem
    const fileExistsOnFs = await fileExists(key, file.name);
    if (!fileExistsOnFs) {
      throw new InternalError(404, "File Not Found on filesystem");
    }

    // Read file from filesystem
    const filePath = getFilePath(key, file.name);
    const fileContent = await fs.readFile(filePath);

    // Create a downloadable response
    return new Response(fileContent, {
      status: 200,
      headers: {
        "Content-Type": file.isBinary
          ? "application/octet-stream"
          : "text/plain",
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Error processing download:", error);

    if (error instanceof InternalError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.code,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        error: "Internal server error: " + (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
