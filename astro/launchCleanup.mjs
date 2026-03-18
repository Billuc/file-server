import { rm, readdir } from "node:fs/promises";

const UPLOAD_PATH = "./uploads/";

export function launchCleanup() {
  const dbPath = Bun.env.ASTRO_DB_REMOTE_URL;
  if (!dbPath) {
    throw new Error(
      "ASTRO_DB_REMOTE_URL is not defined in environment variables.",
    );
  }

  const client = new Bun.SQL({
    adapter: "sqlite",
    filename: dbPath,
  });
  console.log("Launching cleanup...");
  cleanup(client);
  setInterval(() => cleanup(client), 60 * 60 * 1000); // Run every hour
}

/**
 * @param {Bun.SQL} sql
 */
async function cleanup(sql) {
  const notExpiredFiles =
    await sql`SELECT id, name FROM files WHERE expiresAt >= datetime('now');`.values();

  try {
    const files = await readdir(UPLOAD_PATH);

    for (const file of files) {
      const isNotExpired = notExpiredFiles.find((row) => {
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

  await sql`DELETE FROM files WHERE expiresAt < datetime('now');`;
}
