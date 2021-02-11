import userState from "./../userState";
import Router from "@koa/router";
import { TurnoModel } from "../models/Turno";
import verifyToken from "../verifyToken";
import { createEvent, deleteEvent } from "../googleCalendar";
import { IUser } from "../models/User";

const router = new Router();

const replacer = (key: string, value: string) => {
    if (key === "datetime") {
        value = new Date(value).toLocaleString("es-AR", { hour12: false });
    }
    return value;
};

router.post(
    "/turnos",
    verifyToken,
    userState,
    async ({ response, request, state }) => {
        const datetime = new Date(
            request.body.date.substr(0, 10) + " " + request.body.time
        );
        const exists = await TurnoModel.exists({ datetime: datetime });
        if (!exists) {
            let turno = await TurnoModel.create({
                user: request.body.user,
                datetime: datetime,
                description: request.body.description,
            });
            if (turno) {
                turno = await turno.populate("user").execPopulate();
                const endtime = new Date(turno.datetime);
                endtime.setHours(endtime.getHours() + 1);
                const us=turno.user as IUser;
                await createEvent(    
                    us.username,
                    turno.description,
                    turno.datetime.toISOString(),
                    endtime.toISOString(),
                    "America/Buenos_Aires"
                );
                response.status = 200;
                response.body = JSON.stringify(
                    {
                        datetime: turno.datetime,
                        description: turno.description,
                        user: state.user?.admin ? state.user : undefined,
                    },
                    replacer
                );
            }
        }
    }
);


router.get("/turnos", userState, async ({ response, request, state }) => {
    const from = new Date(request.query.datetime);
    const to = new Date(from);
    to.setDate(to.getDate() + 1);
    const turnos = await TurnoModel.find({
        datetime: {
            $gte: from,
            $lt: to,
        },
    }).populate("user");
    if (turnos) {
        const str = JSON.stringify(
            state.user?.admin
                ? turnos
                : turnos.map((turno) => {
                      return {
                          datetime: turno.datetime,
                          description: turno.description,
                      };
                  }),
            replacer
        );
        response.body = str;
        response.status = 200;
    }
});

router.get("/turnosacc", verifyToken, ({ response, request }) =>
    TurnoModel.find({ user: request.query.user }).then((turnos) => {
        if (turnos) {
            const str = JSON.stringify(turnos, replacer);
            response.body = str;
            response.status = 200;
        }
    })
);

router.delete("/turnos", verifyToken, ({ response, request }) =>
    TurnoModel.findByIdAndDelete(request.body.turnoid).then((turno) => {
        if (turno) {
            const str = JSON.stringify(turno, replacer);
            const endtime = new Date(turno.datetime);
            endtime.setHours(endtime.getHours() + 1);
            deleteEvent(turno.datetime.toISOString(),endtime.toISOString(),"America/Buenos_Aires");
            response.body = str;
            response.status = 200;
        }
    })
);

export default router;
