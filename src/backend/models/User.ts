import { Document,Schema,model } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    admin: boolean;
  }

export const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    admin: Boolean
});

export const UserModel = model<IUser>("User",UserSchema);