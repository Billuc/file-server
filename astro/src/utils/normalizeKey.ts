export default function normalizeKey(key: string | undefined) {
  if (!key) return undefined;

  return key
    .replaceAll(" ", "-")
    .replaceAll("é", "e")
    .replaceAll("è", "e")
    .replaceAll("à", "a")
    .replaceAll("ê", "e")
    .replaceAll("ô", "o");
}
