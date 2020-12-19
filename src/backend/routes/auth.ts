import Router from "@koa/router";
import Bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import Jwt from "jsonwebtoken";
import Env from "dotenv";

Env.config();
const router = new Router();

router.post("/register", ({ response, request,cookies }) =>
    Bcrypt.hash(request.body.password, 10).then((pass) =>
        UserModel.create({
            username: request.body.username,
            email: request.body.email,
            password: pass,
        }).then((createdUser) => {
            response.body = {
                username: createdUser.username,
                id: createdUser.id,
                email: createdUser.email,
            };
            const token = Jwt.sign(
                { _id: createdUser.id },
                process.env.JWT_TOKEN as string
            );
            cookies.set("usrtoken", token);
        })
    )
);

router.post("/login", ({ response, request, cookies }) =>
    UserModel.findOne({
        username: request.body.username,
    }).then((user) => {
        if (user) {
            return Bcrypt.compare(request.body.password, user.password).then(
                (result) => {
                    response.status = result ? 200 : 401;
                    const token = Jwt.sign(
                        { _id: user.id },
                        process.env.JWT_TOKEN as string
                    );
                    response.body = {
                        username: user.username,
                        id: user.id,
                        email: user.email,
                    };
                    cookies.set("usrtoken", token);
                }
            );
        } else {
            response.status = 401;
            response.body = {};
        }
    })
);

router.get("/logout", ({ req, res, cookies }) => {
    cookies.set("usrtoken", "");
    res.statusCode = 200;
});

export default router;
