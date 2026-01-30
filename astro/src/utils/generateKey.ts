// Utility function to generate random keys in the format: [a-z]+(-[a-z]+){3}
// Example: aaaaa-bbbbb-ccccc-ddddd
import { webcrypto as crypto } from "node:crypto";
import { readFile } from "node:fs/promises";

const MAX_VALUE = 512;

export async function generateRandomKey(): Promise<string> {
  const requiredBits = Math.ceil(Math.log2(MAX_VALUE));
  const nounsFile = await readFile("src/assets/keys/keys.csv", "utf-8");
  const nouns = nounsFile.split("\n").map((line) => line.split(","));

  const values = crypto.getRandomValues(new Uint16Array(4));
  const segments: string[] = [];

  for (const value of values) {
    const index = value >> (16 - requiredBits);
    segments.push(nouns[index][0]);
  }

  return segments.join("-");
}
