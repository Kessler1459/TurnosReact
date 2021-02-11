import React, { useState } from "react";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

interface Props {
    hide: () => void;
}

const AuthModal: React.FC<Props> = ({ hide }) => {
    const [form, setForm] = useState(true);

    const toggleForm = () => {
        setForm(!form);
    };

    return form ? (
        <>
            <LoginForm hide={hide}></LoginForm>
            <p>
                Not registered? <br />
                <i onClick={toggleForm}>Sign up here</i>
            </p>
        </>
    ) : (
        <>
            <RegisterForm hide={hide}></RegisterForm>
            <p>
                <i onClick={toggleForm}>Or sign in here</i>
            </p>
        </>
    );
};

export default AuthModal;
