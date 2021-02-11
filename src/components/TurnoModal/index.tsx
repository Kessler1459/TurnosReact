import axios from "axios";
import { FormEvent, useState } from "react";
import Turno from "../../Turno";
import User from "../../User";
import Input from "../Input";
import Modal from "../Modal";
import OkButton from "../OkButton";
import styles from "./TurnoModal.module.css";

const TurnoModal = ({
    isShowing,
    toggle,
    date,
    hour,
    user,
    turnos,
    setTurnos
}: {
    isShowing: boolean;
    toggle: () => void;
    date: Date;
    hour: string;
    user: User;
    turnos: Turno[],
    setTurnos:React.Dispatch<React.SetStateAction<Turno[]>>
}) => {
    const [desc, setDescription] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios
            .post<Turno>(
                "http://localhost:9000/turnos",
                {
                    user: user.id,
                    date: date,
                    time: hour,
                    description: desc,
                },
                { withCredentials: true }
            )
            .then((res) => {
                setDescription("");
                setTurnos([...turnos,res.data]);
                toggle();
            });
    };

    const form = (
        <div className={styles.content}>
            <label htmlFor="date">Date</label>
            <Input
                type="text"
                name="date"
                id="date"
                value={date.toUTCString()}
                disabled
            />
            <label htmlFor="hour">Hour</label>
            <Input type="text" name="hour" id="hour" value={hour} disabled />
            <form onSubmit={handleSubmit}>
                <label htmlFor="desc">Description</label>
                <Input
                    autoComplete="off"
                    type="text"
                    name="description"
                    id="desc"
                    value={desc}
                    onChange={(e) =>
                        e.target.value.length < 35
                            ? setDescription(e.target.value)
                            : desc
                    }
                />
                <OkButton className={styles.button} type="submit">Confirm</OkButton>
            </form>
        </div>
    );

    return (
        <Modal isShowing={isShowing} hide={toggle} modalContent={form}></Modal>
    );
};

export default TurnoModal;
