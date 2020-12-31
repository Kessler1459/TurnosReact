import Axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import User from "../../User";
import OkButton from "../OkButton";

interface Props {
    user: User;
    logout: (us: User) => void;
}

const Account: React.FC<Props> = ({ user, logout }) => {
    const hist=useHistory();
    const handleLogout = () => {
        Axios.get("http://localhost:9000/logout",{withCredentials:true}).then(() => {
            logout({ username: "", id: "", email: "" });
            hist.push('/');
        });
    };

    return (
        <>
            <h1>account</h1>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <OkButton onClick={handleLogout}>Logout</OkButton>
        </>
    );
};

export default Account;
