"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
exports.default = (0, postgresql_1.defineConfig)({
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        glob: "!(*.d).{js,ts}",
    },
    entities: [Post_1.Post, User_1.User],
    dbName: "lireddit",
    type: "postgresql",
    user: "postgres",
    password: "admin",
    debug: !constants_1.__prod__,
});
//# sourceMappingURL=mikro-orm.config.js.map