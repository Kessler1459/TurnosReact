import { UserModel } from "./models/User";
import { mongooseConnect } from "./mongooseConnect";
import Koa from "koa";
import Router from "@koa/router";
import KoaBodyParser from "koa-bodyparser";
import Bcrypt from "bcrypt";

mongooseConnect();
const koa = new Koa();
const router = new Router();
koa.use(KoaBodyParser());

router.get("/users", ({ response, request }) => {
    return request.query.username
        ? UserModel.findOne({ username: request.query.username }).then(
              (user) => {
                  response.body = user
                      ? {
                            username: user.username,
                            email: user.email,
                        }
                      : {};
              }
          )
        : UserModel.find({}).then((users) => {
              response.body = users.map(({ username, email }) => ({
                  username,
                  email,
              }));
          });
});

router.post("/users", ({ response, request }) =>
    Bcrypt.hash(request.body.password, 10).then((pass) =>
        UserModel.create({
            username: request.body.username,
            email: request.body.email,
            password: pass,
        }).then((createdUser) => {
            response.body = createdUser;
        })
    )
);

router.post("/login", ({ response, request }) =>
    UserModel.findOne({
        username: request.body.username,
    }).then((user) => {
        if (user) {
            return Bcrypt.compare(request.body.password, user.password).then(
                (result) => {
                    response.status = user ? 200 : 401;
                    response.body = user ? user : {};
                }
            );
        } else {
            response.status = 401;
            response.body = {};
        }
    })
);

router.get("/hola", ({ response }) => {
    response.body = "users";
});

koa.use(router.routes());
koa.use(router.allowedMethods());

koa.listen(9000).on("listening", () => {
    console.log("server listening");
});
