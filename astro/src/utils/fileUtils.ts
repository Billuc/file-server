import { promises as fs } from "fs";
import path from "path";
import { InternalError } from "./InternalError";

export type FileType = "image" | "audio" | "video" | "binary" | "text";

const MAX_FILE_PREVIEW_SIZE = 2 * 1024 * 1024; // 2 MB
const IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "webp",
  "svg",
  "ico",
];
const AUDIO_EXTENSIONS = ["mp3", "wav", "ogg", "flac", "aac", "m4a"];
const VIDEO_EXTENSIONS = ["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm"];
const OTHER_BINARY_EXTENSIONS = [
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
  // Other
  "bin",
  "dat",
  "iso",
  "img",
];

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
    const fileHandle = await fs.open(filePath, "r");
    const stats = await fileHandle.stat();

    if (stats.size > MAX_FILE_PREVIEW_SIZE) {
      let buffer = Buffer.alloc(MAX_FILE_PREVIEW_SIZE); // 2 MB buffer
      let offset = buffer.write(
        "File too large, showing first 2MB only... Download to get the full file !\n\n",
        "utf8",
      );
      const result = await fileHandle.read(
        buffer,
        offset,
        buffer.length - offset,
        0,
      );
      await fileHandle.close();
      return result.buffer.toString("utf8");
    }

    const content = await fileHandle.readFile("utf-8");
    await fileHandle.close();
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

export function getExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/**
 * Determines if a file is binary based on its content type
 */
export function getFileType(filename: string): FileType {
  const extension = getExtension(filename);

  if (IMAGE_EXTENSIONS.includes(extension)) {
    return "image";
  }
  if (AUDIO_EXTENSIONS.includes(extension)) {
    return "audio";
  }
  if (VIDEO_EXTENSIONS.includes(extension)) {
    return "video";
  }
  if (OTHER_BINARY_EXTENSIONS.includes(extension)) {
    return "binary";
  }
  return "text";
}
