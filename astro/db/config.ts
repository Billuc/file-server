import { defineDb, defineTable, column } from "astro:db";

const File = defineTable({
  columns: {
    id: column.text(), // Random key format '[a-z]+(-[a-z]+){3}'
    name: column.text(),
    password: column.text(), // Hashed password for file access
    isBinary: column.boolean(), // Flag indicating if file is binary
    expiresAt: column.date(), // Expiration date (default: 7 days from creation)
    createdAt: column.date(), // Creation timestamp
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    File,
  },
});
