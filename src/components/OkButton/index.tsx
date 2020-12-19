import React, { FunctionComponent } from "react";
import styles from "./OkButton.module.css";

export const OkButton: FunctionComponent<
    React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ ...props }) => {
    return <button className={styles.OkButton} {...props}></button>;
};

export default OkButton;
