import styles from "./Horario.module.css";
import Turno from "../../Turno";
import User from "../../User";
import OkButton from "../OkButton";

const Horario = ({
    date,
    hour,
    turno,
    setHour,
    user,
    toggle,
}: {
    date: Date;
    hour: string;
    turno: Turno | undefined;
    setHour: React.Dispatch<React.SetStateAction<string>>;
    toggle: () => void;
    user: User;
}) => {
    const handleChoose = () => {
        setHour(hour);
        toggle();
    };

    const redRow = () => (
        <tr key={hour} className={styles.ocupado}>
            <td>
                <strong>{hour}</strong>
            </td>
            <td>Not available</td>
            {user.admin? (
                <>
                    <td>{turno?.description}</td>
                    <td>{turno?.user?.username}</td>
                    <td colSpan={3}>{turno?.user?.email}</td>
                </>
            ) : (
                <td></td>
            )}
        </tr>
    );
    
    const blueRow = () => (
        <tr key={hour} className={styles.libre}>
            <td>
                <strong>{hour}</strong>
            </td>
            <td>Free</td>
            {user.id ? (
                <td colSpan={3}>
                    <OkButton onClick={handleChoose}>Choose</OkButton>
                </td>
            ) : (
                <></>
            )}
        </tr>
    );

    const now = new Date();
    const hh = new Date(date.toISOString().split("T")[0] + " " + hour);
    return (
        <>
            {turno || hh.toISOString() <= now.toISOString()
                ? redRow()
                : blueRow()}
        </>
    );
};

export default Horario;
