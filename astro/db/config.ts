import { defineDb, defineTable, column } from "astro:db";

const File = defineTable({
  columns: {
    id: column.text(), // Random key format '[a-z]+(-[a-z]+){3}'
    name: column.text(),
    content: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    File,
  },
});
