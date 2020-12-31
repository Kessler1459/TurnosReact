import React, {
    ChangeEvent,
    FormEvent,
    useState,
} from "react";
import Axios from "axios";
import styles from "./LoginForm.module.css";
import Input from "../Input";
import OkButton from "../OkButton";
import Title from "../Title";
import TUser from "../../User";

interface User {
    username: string;
    password: string;
}

interface Props {
    login: ( usr: TUser ) => void;
    hide: () => void;
}

export const LoginForm:React.FC<Props> = ({login,hide}) => {
    const [user, setUser] = useState<User>({ username: "", password: "" });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        Axios.post("http://localhost:9000/login", user, {
            withCredentials: true,
        }).then((response) => {
            if ((response.status = 200)) {
                login({
                    username: response.data.username,
                    id: response.data.id,
                    email: response.data.email,
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
            className={styles.LoginForm}
        >
            <Title>Login</Title>
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
            <OkButton type="submit">Sign In</OkButton>
        </form>
    );
};

export default LoginForm;
