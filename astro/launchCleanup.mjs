import { env } from "node:process";
import { rm, readdir } from "node:fs/promises";
import { createClient } from "@libsql/client";

const SELECT_QUERY =
  "SELECT id, name FROM files WHERE expiresAt >= datetime('now');";
const DELETE_QUERY = "DELETE FROM files WHERE expiresAt < datetime('now');";

const UPLOAD_PATH = "./uploads/";

export function launchCleanup() {
  const dbPath = env["ASTRO_DB_REMOTE_URL"];
  if (!dbPath) {
    throw new Error(
      "ASTRO_DB_REMOTE_URL is not defined in environment variables.",
    );
  }

  const client = createClient({ url: dbPath });

  setInterval(
    async () => {
      const notExpiredFiles = await client.execute(SELECT_QUERY);

      try {
        const files = await readdir(UPLOAD_PATH);

        for (const file of files) {
          const isNotExpired = notExpiredFiles.rows.find((row) => {
            const id = row[0];
            const name = row[1];
            return file === `${id}__${name}`;
          });

          if (!isNotExpired) {
            console.log(`Deleting expired file: ${file}`);
            await rm(`./uploads/${file}`);
          }
        }
      } catch (err) {
        console.error("Could not read upload directory", err);
      }

      await client.execute(DELETE_QUERY);
    },
    60 * 60 * 1000,
  ); // Run every hour
}
