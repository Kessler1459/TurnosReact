import { Document, Schema, model } from "mongoose";
import { IUser } from "./User";

export interface ITurno extends Document {
    datetime: Date,
    description: string,
    user: {type:Schema.Types.ObjectId, ref:"User"}|IUser;
}


export const TurnoSchema = new Schema({
    datetime: Date,
    description: String,
    user: {type:Schema.Types.ObjectId , ref:"User"},
});

export const TurnoModel = model<ITurno>("Turno", TurnoSchema);
