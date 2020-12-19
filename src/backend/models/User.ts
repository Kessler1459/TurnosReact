import { Document,Schema,model } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
  }

export const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
});

export const UserModel = model<IUser>("User",UserSchema);