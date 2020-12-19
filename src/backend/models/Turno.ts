import { Document,Schema,model } from "mongoose";

export interface ITurno extends Document {
    user_id: string;
    datetime: string;
    description: string;
  }

export const TurnoSchema = new Schema({
    username: String,
    datetime: String,
    description: String,
});

export const TurnoModel = model<ITurno>("User",TurnoSchema);