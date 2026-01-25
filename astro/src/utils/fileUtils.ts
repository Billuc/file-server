import { promises as fs } from "fs";
import path from "path";
import { InternalError } from "./InternalError";

/**
 * Gets the file path for a given key and filename
 */
export function getFilePath(key: string, filename: string): string {
  const uploadsDir = path.join(process.cwd(), "uploads");
  return path.join(uploadsDir, `${key}__${filename}`);
}

/**
 * Reads file content from filesystem.
 * Make sure the file is a text file before calling this function.
 */
export async function readTextFile(
  key: string,
  filename: string,
): Promise<string> {
  const filePath = getFilePath(key, filename);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Failed to read file from filesystem: ${filePath}`, error);
    throw new InternalError(
      500,
      "Internal Server Error: Failed to read file from filesystem",
    );
  }
}

/**
 * Checks if a file exists on the filesystem
 */
export async function fileExists(
  key: string,
  filename: string,
): Promise<boolean> {
  const filePath = getFilePath(key, filename);

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes a file from the filesystem
 */
export async function deleteFile(key: string, filename: string): Promise<void> {
  const filePath = getFilePath(key, filename);

  try {
    await fs.unlink(filePath);
    console.log(`File deleted from filesystem: ${filePath}`);
  } catch (error) {
    console.error(`Failed to delete file from filesystem: ${filePath}`, error);
    throw new InternalError(
      500,
      "Internal Server Error: Failed to delete file from filesystem",
    );
  }
}

export async function saveFile(key: string, file: File): Promise<void> {
  const filePath = getFilePath(key, file.name);

  try {
    const uploadsDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const fileStream = file.stream();
    await fs.writeFile(filePath, fileStream);
  } catch (error) {
    console.error(`Failed to save file to filesystem: ${filePath}`, error);
    throw new InternalError(
      500,
      "Internal Server Error: Failed to save file to filesystem",
    );
  }
}

/**
 * Determines if a file is binary based on its content type
 */
export function isBinaryFile(filename: string): boolean {
  const binaryExtensions = [
    // Images
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "webp",
    "svg",
    "ico",
    // Documents
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    // Archives
    "zip",
    "rar",
    "tar",
    "gz",
    "7z",
    // Executables
    "exe",
    "dll",
    "so",
    "dmg",
    "app",
    // Audio/Video
    "mp3",
    "wav",
    "ogg",
    "mp4",
    "avi",
    "mkv",
    "mov",
    "wmv",
    // Other
    "bin",
    "dat",
    "iso",
    "img",
  ];

  const extension = filename.split(".").pop()?.toLowerCase();
  return extension ? binaryExtensions.includes(extension) : false;
}
