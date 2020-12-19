import React, { ChangeEvent, FormEvent, useState } from "react";
import Axios from "axios";
import styles from "./RegisterForm.module.css";
import Input from "../Input";
import OkButton from "../OkButton";
import Title from "../Title";
import TUser from "../../User";

interface User {
    email:string,
    username: string,
    password: string,
}

interface Props {
    login: ( usr: TUser ) => void;
}

const RegisterForm: React.FC<Props> = ({login}) => {
    const [user, setUser] = useState<User>({ email:"",username: "", password: "" });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Axios.post("http://localhost:9000/register", user, {
            withCredentials: true,
        }).then((response) => {
            if ((response.status = 200)) {
                login({
                    username: response.data.username,
                    id: response.data.id,
                    email: response.data.email,
                });
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
                type="text"
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
