import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import useModal from "../../useModal";
import User from "../../User";
import AuthModal from "../AuthModal";

interface Props {
    user: User;
    login: (usr: User) => void;
}

export const NavBar: React.FC<Props> = ({ user, login }) => {
    const { isShowing, toggle } = useModal();

    return (
        <>
            <nav className={styles.nav}>
                <ul>
                    <li className={styles.item}>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    {user.username !== "" ? (
                        <li className={styles.item}>
                            <Link to="/account">
                                Account
                            </Link>
                        </li>
                    ) : (
                        <li className={styles.item} onClick={toggle}>
                            Login
                        </li>
                    )}
                </ul>
            </nav>
            <Modal
                modalContent={<AuthModal login={login} hide={toggle} />}
                isShowing={isShowing}
                hide={toggle}
            />
        </>
    );
};

export default NavBar;
