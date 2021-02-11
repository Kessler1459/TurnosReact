import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Axios from "axios";
import styles from "./RegisterForm.module.css";
import Input from "../Input";
import OkButton from "../OkButton";
import Title from "../Title";
import { UserContext } from "../../userContext";

interface User {
    email:string,
    username: string,
    password: string,
}

interface Props {
    hide:() => void
}

const RegisterForm: React.FC<Props> = ({hide}) => {
    const [user, setUser] = useState<User>({ email:"",username: "", password: "" });
    const contx = useContext (UserContext);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Axios.post("http://localhost:9000/register", user, {
            withCredentials: true,
        }).then((response) => {
            if ((response.status = 200)) {
                contx.updateUser ({
                    username: response.data.username,
                    id: response.data.id,
                    email: response.data.email,
                    admin: response.data.admin,
                });
                hide();
            }
        });
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const elementName = event.target.name;
        setUser({
            ...user,
            [elementName]: event.target.value,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            method="post"
            className={styles.RegisterForm}
        >
            <Title>Register</Title>
            <Input
                value={user.email}
                onChange={handleInput}
                type="email"
                name="email"
                placeholder="Email"
            />
            <Input
                value={user.username}
                onChange={handleInput}
                type="text"
                name="username"
                placeholder="Username"
            />
            <Input
                value={user.password}
                onChange={handleInput}
                type="password"
                name="password"
                placeholder="Password"
            />
            <OkButton type="submit">Sign Up</OkButton>
        </form>
    );
};

export default RegisterForm;
