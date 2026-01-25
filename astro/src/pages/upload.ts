import type { APIRoute } from "astro";
import { db, File as DbFile } from "astro:db";
import { generateRandomKey } from "../utils/generateKey";
import { isBinaryFile, saveFile } from "../utils/fileUtils";

export const prerender = false;

/**
 * Extracts file data from FormData entry value
 * Handles File objects, Blobs, and strings
 */
function extractFileFromFormData(
  file: FormDataEntryValue,
  filename: string,
): File {
  if (file instanceof File) {
    return file;
  }

  return new File([String(file)], filename);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file");
    const name = formData.get("name")?.toString();
    const password = formData.get("password")?.toString() || null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract file data using our modular method
    const extractedFile = extractFileFromFormData(file, name || "unknown.txt");

    // Generate a unique key for the file
    const key = generateRandomKey();
    console.log("Generated key for uploaded file:", key);

    // Determine if file is binary
    const isBinary = isBinaryFile(extractedFile.name);

    // Calculate expiration date (7 days from now)
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Save to filesystem
    await saveFile(key, extractedFile);

    // Store only file metadata in the database (no content)
    await db.insert(DbFile).values({
      id: key,
      name: extractedFile.name,
      password: password,
      isBinary: isBinary,
      expiresAt: expiresAt,
      createdAt: now,
    });

    return new Response(JSON.stringify({ key }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing upload:", error);
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
