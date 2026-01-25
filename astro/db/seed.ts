import { hashPassword } from "@/utils/passwordUtils";
import { db, File } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // Calculate expiration date (7 days from now)
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const sampleFiles = [
    {
      id: "chien-blanc-chat-noir",
      name: "file1.txt",
      password: await hashPassword(""), // No password
      isBinary: false, // Text file
      expiresAt: expiresAt,
      createdAt: now,
    },
    {
      id: "tortue-geniale-lapin-rapide",
      name: "file2.txt",
      password: await hashPassword("secret123"), // With password
      isBinary: false, // Text file
      expiresAt: expiresAt,
      createdAt: now,
    },
    {
      id: "lion-feroce-aigle-agile",
      name: "file3.txt",
      password: await hashPassword(""), // No password
      isBinary: true, // Binary file
      expiresAt: expiresAt,
      createdAt: now,
    },
  ];

  await db.insert(File).values(sampleFiles);
}
