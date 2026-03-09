import type { APIRoute } from "astro";
import { db, files } from "astro:db";
import { eq } from "astro:db";
import { InternalError } from "@/utils/InternalError.ts";
import { promises as fs } from "fs";
import { getFilePath, fileExists, getFileType } from "../../utils/fileUtils.ts";
import { t, TranslationKeys } from "@/utils/i18n.ts";

export const prerender = false;

export const GET: APIRoute = async ({ params, url, preferredLocale }) => {
  try {
    const key = params.key;
    const enc = url.searchParams.get("enc");
    const download = url.searchParams.get("download") === "true";

    if (!key) {
      throw new InternalError(
        400,
        t(TranslationKeys.NoKeyProvided, preferredLocale),
      );
    }

    // Fetch the file metadata from the database
    const file = await db.select().from(files).where(eq(files.id, key)).get();

    if (!file) {
      throw new InternalError(
        404,
        t(TranslationKeys.NotFound, preferredLocale),
      );
    }

    // Check if file has expired
    const now = new Date();
    if (file.expiresAt && now > file.expiresAt) {
      throw new InternalError(
        410,
        t(TranslationKeys.FileHasExpired, preferredLocale),
      );
    }

    // Check password if required
    if (file.password !== enc) {
      return new Response(
        JSON.stringify({
          error: t(TranslationKeys.IncorrectPassword, preferredLocale),
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Check if file exists on filesystem
    const fileExistsOnFs = await fileExists(key, file.name);
    if (!fileExistsOnFs) {
      throw new InternalError(
        404,
        t(TranslationKeys.NotFoundOnFS, preferredLocale),
      );
    }

    // Read file from filesystem
    const filePath = getFilePath(key, file.name);
    const fileContent = await fs.readFile(filePath);

    const headers: HeadersInit = {
      "Content-Type":
        getFileType(file.name) !== "text"
          ? "application/octet-stream"
          : "text/plain",
      "Content-Disposition": download
        ? `attachment; filename="${file.name}"`
        : `inline; filename="${file.name}"`,
    };

    // Create a downloadable response
    return new Response(fileContent, {
      status: 200,
      headers,
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
        error:
          t(TranslationKeys.InternalServerError, preferredLocale) +
          ": " +
          (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
