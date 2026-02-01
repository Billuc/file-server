// Utility function to generate random keys in the format: [a-z]+(-[a-z]+){3}
// Example: aaaaa-bbbbb-ccccc-ddddd
import { webcrypto as crypto } from "node:crypto";
import { readFile } from "node:fs/promises";

let _generator: KeyGenerator | null = null;

export async function generateRandomKey(): Promise<string> {
  if (!_generator) {
    _generator = await KeyGenerator.create();
  }

  return _generator.generate(2);
}

class KeyGenerator {
  nouns: Noun[];
  adjectives: [string, string][]; // Each entry is a tuple of masculine and feminine adjectives
  nounsBits: number;
  adjectivesBits: number;

  private constructor(nouns: Noun[], adjectives: [string, string][]) {
    this.nouns = nouns;
    this.adjectives = adjectives;
    this.nounsBits = Math.floor(Math.log2(nouns.length));
    this.adjectivesBits = Math.floor(Math.log2(adjectives.length));
  }

  static async create(): Promise<KeyGenerator> {
    const nounsFile = await readFile("src/assets/nouns.csv", "utf-8");
    const adjectivesFile = await readFile("src/assets/adjectives.csv", "utf-8");

    const nouns = nounsFile
      .replaceAll("\r\n", "\n")
      .split("\n")
      .map((line) => {
        const [word, gender] = line.split(",");
        return new Noun(word, gender as "m" | "f");
      });
    const adjectives: [string, string][] = adjectivesFile
      .replaceAll("\r\n", "\n")
      .split("\n")
      .map((line) => {
        const [masculine, feminine] = line.split(",");
        return [masculine, feminine];
      });

    return new KeyGenerator(nouns, adjectives);
  }

  async generate(numberOfPairs: number): Promise<string> {
    const segments: string[] = [];
    const values = crypto.getRandomValues(new Uint16Array(numberOfPairs * 2));

    for (let i = 0; i < numberOfPairs; i++) {
      const nounValue = values[2 * i];
      const adjectiveValue = values[2 * i + 1];

      const nounIndex = nounValue >> (16 - this.nounsBits);
      const adjectiveIndex = adjectiveValue >> (16 - this.adjectivesBits);

      const noun = this.nouns[nounIndex];
      const adjective = this.adjectives[adjectiveIndex];

      segments.push(noun.word);
      segments.push(noun.gender === "m" ? adjective[0] : adjective[1]);
    }

    return segments.join("-");
  }
}

class Noun {
  word: string;
  gender: "m" | "f";

  constructor(word: string, gender: "m" | "f") {
    this.word = word;
    this.gender = gender;
  }
}
