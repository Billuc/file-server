const KEY = "partagexpress-files";

export function getFiles() {
  const items = localStorage
      .getItem(KEY)
      ?.split(",")
      ?.filter((k) => k.length > 0) ?? [];
  const files = items.map((k) => k.split(":")).map(([k, ex]) => [k, new Date(Number(ex))]);
  return files;
}

export function addFile(key: string, expires: Date) {
  const files = getFiles();
  if (files.find(([k, _]) => k === key)) {
    return;
  }
  saveFiles([...files, [key, expires]]);
}

function saveFiles(files: [string, Date][]) {
  const itemsStr = files.map(([key, expires]) => `${key}:${expires.valueOf()}`).join(",");
  localStorage.setItem(KEY, itemsStr);
}

export function removeFile(key: string) {
  const newFiles = getFiles().filter(([k, _]) => k !== key);
  saveFiles(newFiles);
}
