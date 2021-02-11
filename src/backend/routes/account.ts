import { Context } from "koa";
import Router from "@koa/router";
import { UserModel } from "../models/User";
import Jwt from "jsonwebtoken";

const router = new Router();

router.get("/account", (ctx:Context) => {
    const cookie=ctx.cookies.get("usrtoken");
    if(cookie){
        return getUser(cookie).then(
            (user) => {
                if(user){            
                    ctx.status=200;
                    ctx.body = {
                        id: user?.id,
                        username: user?.username,
                        email: user?.email,
                        admin: user.admin
                    };
                }
            }
        );
    }
    else{
        ctx.status=200;
        ctx.body={};
        return {};
    }
});

export const getUser = (userToken:string) =>
    UserModel.findById(Jwt.decode(userToken));


export default router;
