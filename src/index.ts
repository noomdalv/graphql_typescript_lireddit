import { MikroORM, RequestContext, RequiredEntityData } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroOrmConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();
  await RequestContext.createAsync(orm.em, async () => {
    // const post = orm.em.create(Post, {
    //   id: 1,
    //   title: "my first post",
    // } as RequiredEntityData<Post>);
    // await orm.em.persistAndFlush(post);

    const posts = orm.em.find(Post, {});
    posts.then(console.log);
  });
};

main().catch((err) => console.log(err));
