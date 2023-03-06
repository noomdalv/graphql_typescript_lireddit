import { defineConfig } from "@mikro-orm/postgresql";
import { __prod__ } from "./constants";
import path from "path";

import { Post } from "./entities/Post";
import { User } from "./entities/User";

export default defineConfig({
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    glob: "!(*.d).{js,ts}", // how to match migration files (all .js and .ts files, but not .d.ts)
  },
  entities: [Post, User],
  dbName: "lireddit",
  type: "postgresql",
  user: "postgres",
  password: "admin",
  debug: !__prod__,
});
