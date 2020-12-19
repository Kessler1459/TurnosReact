import React, { FunctionComponent } from "react";
import styles from "./input.module.css";

export const Input:FunctionComponent<React.InputHTMLAttributes<HTMLInputElement>> = ({...props}) =>{
    return <input className={styles.Input} {...props} />;
}

export default Input;