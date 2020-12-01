import mongoose from "mongoose";

export const mongooseConnect = () => {
    mongoose
        .connect("mongodb://localhost:27017/turnos", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((mongooseConnection) => {
            console.log("db connected");
            return mongooseConnection;
        });
};

export default mongooseConnect;
