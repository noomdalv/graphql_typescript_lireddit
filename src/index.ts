import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();
  // await RequestContext.createAsync(orm.em, async () => {
  //   const post = orm.em.create(Post, {
  //     id: 3,
  //     title: "3rd post",
  //   } as RequiredEntityData<Post>);
  //   await orm.em.persistAndFlush(post);
  // });

  const app = express();

  // Initialize client.
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
    disableTouch: true,
  });

  // Initialize sesssion storage.
  app.use(
    session({
      name: "qid",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      proxy: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //years
        httpOnly: true,
        sameSite: "none",
        secure: true, // https active only in prod
      },
      secret: "keyboard cat",
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext): MyContext => ({
      em: orm.em.fork(),
      req,
      res,
    }),
  });

  await apolloServer.start();

  const cors = {
    credentials: true,
    origin: "https://studio.apollographql.com",
  };

  apolloServer.applyMiddleware({ app, cors });

  app.listen(4000, () => {
    console.log("Listening on port 4000");
  });
};

main().catch((err) => console.log(err));
