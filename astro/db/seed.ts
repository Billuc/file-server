import { db, File } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  const sampleFiles = [
    {
      id: "aaaaa-bbbbb-ccccc-ddddd",
      name: "file1.txt",
      content: "This is the content of File 1.",
    },
    {
      id: "bbbbb-ccccc-ddddd-eeeee",
      name: "file2.txt",
      content: "This is the content of File 2.",
    },
    {
      id: "ccccc-ddddd-eeeee-fffff",
      name: "file3.txt",
      content: "This is the content of File 3.",
    },
  ];

  await db.insert(File).values(sampleFiles);
}
