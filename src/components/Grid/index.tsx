import { useState, useContext } from "react";
import Turno from "../../Turno";
import useModal from "../../useModal";
import { UserContext } from "../../userContext";
import Horario from "../Horario";
import TurnoModal from "../TurnoModal";
import styles from "./Grid.module.css";

const Grid = ({
    turnos,
    date,
    setTurnos,
}: {
    turnos: Turno[];
    date: Date;
    setTurnos: React.Dispatch<React.SetStateAction<Turno[]>>;
}) => {
    const { user } = useContext(UserContext);
    const [hour, setHour] = useState("");
    const { isShowing, toggle } = useModal();
    const timesArray = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
    ];

    return (
        <>
            <TurnoModal
                date={date}
                hour={hour}
                user={user}
                turnos={turnos}
                setTurnos={setTurnos}
                isShowing={isShowing}
                toggle={toggle}
            />
            <table className={styles.tableHorarios}>
                <tbody>
                    {timesArray.map((value, key) => {
                        return (
                            <Horario
                                user={user}
                                toggle={toggle}
                                key={key}
                                setHour={setHour}
                                hour={value}
                                date={date}
                                turno={turnos?.find(
                                    (turno) =>
                                        turno.datetime.split(" ")[1] ===
                                        value + ":00"
                                )}
                            ></Horario>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Grid;
