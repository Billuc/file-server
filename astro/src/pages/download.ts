import type { APIRoute } from "astro";
import { db, File as DbFile } from "astro:db";
import { eq } from "astro:db";
import { InternalError } from "@/utils/InternalError";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    // Extract the key from query parameters
    const key = url.searchParams.get("key");

    if (!key) {
      return new Response(JSON.stringify({ error: "No key provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the file from the database
    const file = await db.select().from(DbFile).where(eq(DbFile.id, key)).get();

    if (!file) {
      throw new InternalError(404, "File Not Found");
    }

    // Create a downloadable response
    return new Response(file.content, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
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
