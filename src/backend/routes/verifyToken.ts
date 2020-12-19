import Jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import Env from "dotenv";
import { exception } from "console";

Env.config();

const verify = async ({response, cookies }: Context, next: Next) => {
    const token = cookies.get("usrtoken");
    if (!token) {
        response.status = 401;
    } else {
        try {
            const verified = Jwt.verify(token, process.env.JWT_TOKEN as string);
            if (verified) {
                await next();
            } else throw exception;
        } catch (err) {
            response.status = 400;
        }
    }
};

export default verify;
