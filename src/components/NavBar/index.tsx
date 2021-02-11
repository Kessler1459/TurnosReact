import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import useModal from "../../useModal";
import AuthModal from "../AuthModal";
import { useContext } from "react";
import { UserContext } from "../../userContext";

export const NavBar: React.FC = () => {
    const { isShowing, toggle } = useModal();
    const { user } = useContext(UserContext);

    return (
        <>
            <nav className={styles.nav}>
                <ul>
                    <Link to="/">
                        <li className={styles.item}>Home </li>
                    </Link>
                    {user.username ? (
                        <Link to="/account">
                            <li className={styles.item}>Account </li>
                        </Link>
                    ) : (
                        <li className={styles.item} onClick={toggle}>
                            Login
                        </li>
                    )}
                </ul>
            </nav>
            <Modal
                modalContent={<AuthModal hide={toggle} />}
                isShowing={isShowing}
                hide={toggle}
            />
        </>
    );
};

export default NavBar;
