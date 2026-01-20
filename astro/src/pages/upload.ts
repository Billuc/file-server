import type { APIRoute } from "astro";
import { db, File as DbFile } from "astro:db";
import { generateRandomKey } from "../utils/generateKey";
import { promises as fs } from "fs";
import path from "path";

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

/**
 * Saves file content to the filesystem
 * Creates uploads directory if it doesn't exist
 */
async function saveFileToFilesystem(key: string, file: File): Promise<void> {
  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, key + "__" + file.name);
    await fs.writeFile(filePath, file.stream());
    console.log(`File saved to filesystem: ${filePath}`);
  } catch (error) {
    console.error("Failed to save file to filesystem:", error);
    // Re-throw to allow caller to handle the error if needed
    throw error;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file");
    const name = formData.get("name")?.toString();

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract file data using our modular method
    const extractedFile = await extractFileFromFormData(
      file,
      name || "unknown.txt",
    );

    // Generate a unique key for the file
    const key = generateRandomKey();
    console.log("Generated key for uploaded file:", key);

    // Save to filesystem (errors won't break the upload process)
    try {
      await saveFileToFilesystem(key, extractedFile);
    } catch (fsError) {
      console.error(
        "Filesystem save failed, but continuing with database storage:",
        fsError,
      );
    }

    // Store the file in the database
    await db.insert(DbFile).values({
      id: key,
      name: extractedFile.name,
      content: await extractedFile.text(),
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
