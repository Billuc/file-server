import { db, File } from "astro:db";
import { generateRandomKey } from "../src/utils/generateKey";

// https://astro.build/db/seed
export default async function seed() {
  const sampleFiles = [
    {
      id: "aaaaa-bbbbb-ccccc-ddddd",
      name: "File 1",
      content: "This is the content of File 1.",
    },
    {
      id: "bbbbb-ccccc-ddddd-eeeee",
      name: "File 2",
      content: "This is the content of File 2.",
    },
    {
      id: "ccccc-ddddd-eeeee-fffff",
      name: "File 3",
      content: "This is the content of File 3.",
    },
  ];

  await db.insert(File).values(sampleFiles);
}
