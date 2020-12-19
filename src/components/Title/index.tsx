import { FunctionComponent } from "react";
import styles from "./Title.module.css";

export const Title: FunctionComponent<
    React.HTMLAttributes<HTMLHeadingElement>
> = ({ ...props }) => {
    // eslint-disable-next-line jsx-a11y/heading-has-content
    return <h1 className={styles.Title} {...props}></h1>;
};

export default Title;
