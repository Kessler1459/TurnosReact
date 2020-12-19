import { Context } from "koa";
import Router from "@koa/router";
import verifyToken from "./verifyToken";
import { UserModel } from "../models/User";
import Jwt from "jsonwebtoken";

const router = new Router();

router.get("/account", verifyToken, (ctx:Context) => {
    return UserModel.findById(Jwt.decode(ctx.cookies.get("usrtoken") as string)).then(
        (user) => {
            if(user){            
                ctx.status=200;
                ctx.body = {
                    id: user?.id,
                    username: user?.username,
                    email: user?.email,
                };
            }
            else {
                ctx.response.status = 401;
                ctx.body = {};
            }
        }
    );
});

export default router;
