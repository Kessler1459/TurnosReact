import { mongooseConnect } from "./mongooseConnect";
import Koa from "koa";
import KoaBodyParser from "koa-bodyparser";
import AuthRooter from "./routes/auth";
import AccountRouter from "./routes/account";
import TurnosRouter from "./routes/turnos";
import cors from "@koa/cors";

mongooseConnect();
const koa = new Koa();

koa.use(cors({
    origin: ctx => ctx.request.header.origin,
    credentials: true
  }));
koa.use(KoaBodyParser());
koa.use(AuthRooter.routes());
koa.use(AccountRouter.routes());
koa.use(TurnosRouter.routes());

koa.listen(9000).on("listening", () => {
    console.log("server listening at port 9000");
});
