const KEY = "partagexpress-files";

export function getFiles() {
  return (
    localStorage
      .getItem(KEY)
      ?.split(",")
      ?.filter((k) => k.length > 0) ?? []
  );
}

export function addFile(key: string) {
  const files = new Set(getFiles());
  files.add(key);
  saveFiles([...files]);
}

function saveFiles(keys: string[]) {
  const itemsStr = keys.join(",");
  localStorage.setItem(KEY, itemsStr);
}

export function removeFile(key: string) {
  const files = new Set(getFiles());
  files.delete(key);
  saveFiles([...files]);
}
