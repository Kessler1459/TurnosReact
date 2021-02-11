import mongoose from "mongoose";
import env from "dotenv";

env.config();

export const mongooseConnect = () => {
    mongoose
        .connect(process.env.ATLAS_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((mongooseConnection) => {
            console.log("db connected");
            return mongooseConnection;
        });
};

export default mongooseConnect;
