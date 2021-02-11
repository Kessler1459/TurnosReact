import { Context, Next } from "koa";
import { getUser } from "./routes/account";

const userState = ({ cookies, state }: Context, next: Next) =>
    getUser(cookies.get("usrtoken") as string).then(async (user) => {
        if (user) {  
            state.user = {
                username: user.username,
                email: user.email,
                admin: user.admin,
            };
        }
        await next();
    });

export default userState;
