import { defineConfig } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import path from "path";

export default defineConfig({
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  entities: [Post],
  dbName: "lireddit",
  type: "postgresql",
  user: "postgres",
  password: "admin",
  debug: !__prod__,
});
