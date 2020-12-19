import React, { useState } from "react";
import User from "../../User";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

interface Props {
    login: (us: User) => void;
}

const AuthModal: React.FC<Props> = ({ login }) => {
    const [form, setForm] = useState(true);

    const toggleForm = () => {
        setForm(!form);
    };

    return form ? (
        <>
            <LoginForm login={login}></LoginForm>
            <p>
                Not registered? <br />
                <i onClick={toggleForm}>Sign up here</i>
            </p>
        </>
    ) : (
        <>
            <RegisterForm login={login}></RegisterForm>
            <p>
                <i onClick={toggleForm}>Or sign in here</i>
            </p>
        </>
    );
};

export default AuthModal;