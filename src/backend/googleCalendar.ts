import { google } from "googleapis";
import Env from "dotenv";
import console from "console";

Env.config();
/*
const credentials = JSON.parse(
    readFileSync(path.resolve(__dirname, "./credentials.json"), "utf8")
);*/

const oauth2Client = new google.auth.OAuth2(
    process.env.client_id,
    process.env.client_secret,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.refresh_token,
});

export const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
});

export const createEvent = (
    summary: string,
    description: string,
    start: string,
    end: string,
    timezone: string
) =>
    calendar.events
        .insert({
            calendarId: "primary",
            requestBody: {
                summary: summary,
                description: description,
                start: {
                    dateTime: start,
                    timeZone: timezone,
                },
                end: {
                    dateTime: end,
                    timeZone: timezone,
                },
            },
        });

export const deleteEvent = async (start: string, end: string, timezone: string) => {
    const res = await calendar.events.list({
        timeMin: start,
        timeMax: end,
        timeZone: timezone,
        calendarId: "primary",
    });
    if (res.data.items) {
        const id = res.data.items[0]?.id;
        if (id){
            return calendar.events
                .delete({ eventId: id  ,calendarId:"primary"})
                .then(() => console.log(`event ${id} deleted`))
                .catch((err) => console.log(err));
        }
    }
};

export default calendar;
