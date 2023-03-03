import { MikroORM, RequiredEntityData } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    entities: [Post],
    dbName: "lireddit",
    type: "postgresql",
    debug: !__prod__,
  });

  const post = orm.em.create(Post, {
    id: 1,
    title: "my first post",
  } as RequiredEntityData<Post>);
  await orm.em.persistAndFlush(post);
  console.log("====== SQL 2 =======");
  await orm.em.insert(Post, { title: "my second post" });
};

main().catch((err) => console.log(err));
