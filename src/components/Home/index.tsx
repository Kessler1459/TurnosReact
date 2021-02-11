import Axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Turno from "../../Turno";
import { UserContext } from "../../userContext";
import Grid from "../Grid";
import Title from "../Title";
import styles from "./Home.module.css";

const Home = () => {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [date, setDate] = useState(convertDate(new Date()));
    const { user } = useContext(UserContext);

    useEffect(() => {
        Axios.get("http://localhost:9000/turnos", {
            params: { datetime: new Date(date) },
            withCredentials: true,
        }).then((response) => {
            if (response) {
                setTurnos(response.data);
            }
        });
    }, [user, date]);

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.value;
        if (selected) {
            setDate(selected);
        }
    };

    function convertDate(date: Date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = date.getDate().toString();
        var mmChars = mm.split("");
        var ddChars = dd.split("");
        return (
            yyyy +
            "-" +
            (mmChars[1] ? mm : "0" + mmChars[0]) +
            "-" +
            (ddChars[1] ? dd : "0" + ddChars[0])
        );
    }

    return (
        <>
            <section className={styles.cont}>
                <Title>Book your appointment</Title>
                <div className={styles.flexcont}>
                    <div className={styles.selectCont}>
                        <label htmlFor="datepick">
                            <h2>Select a date:</h2>
                        </label>
                        <input
                            type="date"
                            name="datetime"
                            id="datepick"
                            value={date}
                            onChange={handleDateChange}
                            className={styles.calend}
                            min={convertDate(new Date())}
                        />
                    </div>
                    <Grid
                        date={new Date(date+"T00:00:00")}
                        turnos={turnos}
                        setTurnos={setTurnos}
                    ></Grid>
                </div>
            </section>
        </>
    );
};

export default Home;
