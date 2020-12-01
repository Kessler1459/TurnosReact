import { Document,Schema,model } from "mongoose";

export const UserSchema = new Schema<{
    username: string;
    password: string;
    email: string;
}>({
    username: String,
    password: String,
    email: String,
});

export const UserModel = model<Document & typeof UserSchema.methods>(
    "User",
    UserSchema
);
