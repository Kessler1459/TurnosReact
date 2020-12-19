import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import useModal from "../../useModal";
import User from "../../User";
import AuthModal from "../AuthModal";

interface Props {
    login: ( usr: User ) => void;
}

export const NavBar: React.FC<Props> = ({login}) => {
    const { isShowing, toggle } = useModal();

    return (
        <>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link className={styles.link} to="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.link} onClick={toggle}>
                        Login
                    </li>
                    <li>
                        <Link className={styles.link} to="/account">
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
            <Modal
                modalContent={<AuthModal login={login} />}
                isShowing={isShowing}
                hide={toggle}
            />
        </>
    );
};

export default NavBar;
