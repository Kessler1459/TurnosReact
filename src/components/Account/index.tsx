import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import User from "../../User";
import OkButton from "../OkButton";
import Turno from "../../Turno";
import styles from "./Account.module.css";
import Title from "../Title";

const Account = ({
    user,
    logout,
}: {
    user: User;
    logout: (us: User) => void;
}) => {
    const hist = useHistory();
    const [turnos, setTurnos] = useState<Turno[]>([]);

    useEffect(() => {
        if (user.id) {
            Axios.get("http://localhost:9000/turnosacc", {
                params: { user: user.id },
                withCredentials: true,
            }).then((res) => {
                setTurnos(res ? res.data : []);
            });
        }
    }, [user]);

    const handleLogout = () => {
        Axios.get("http://localhost:9000/logout", {
            withCredentials: true,
        }).then(() => {
            logout({ username: null, id: null, email: null, admin: null });
            hist.push("/");
        });
    };

    const deleteSchedule = (turnoId: string) => {
        Axios.delete("http://localhost:9000/turnos", {
            data: { turnoid: turnoId },
            withCredentials: true,
        }).then((res) => {
            if (res.status === 200) {
                setTurnos(turnos.filter((turno) => turno._id !== res.data._id));
            }
        });
    };

    return (
        <>
            <section className={styles.cont}>
                <Title>Account</Title>
                <div className={styles.gridcont}>
                    <div>
                        <h2>Details</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <OkButton onClick={handleLogout}>Logout</OkButton>
                    </div>
                    <div>
                        <h2>My Schedule</h2>
                        <table className={styles.tableTurnos}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turnos.map((turno, key) => (
                                    <tr key={key}>
                                        <td>
                                            {turno.datetime.substring(0, 10)}
                                        </td>
                                        <td>
                                            {turno.datetime.substring(10, 15)}
                                        </td>
                                        <td>{turno.description}</td>
                                        <td>
                                            <button
                                                className={styles.cancel}
                                                onClick={() =>
                                                    deleteSchedule(turno._id)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Account;
