import { createContext } from "react";
import User from "./User";

type contextType = { user: User; updateUser:React.Dispatch<User>};

const con: contextType = { user: { email: null, id: null, username: null, admin: null},updateUser:(us:User)=>{} };

export const UserContext = createContext(con);
