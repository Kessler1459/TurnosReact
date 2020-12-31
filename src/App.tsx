import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Account from "./components/Account";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./User";
import Axios from "axios";

function App() {
    const [user, setUser] = useState<User>({ id: "", username: "", email: "" });

    useEffect(() => {
        console.log("useEffect app");
        Axios.get("http://localhost:9000/account",{
            withCredentials: true,
        }).then((res) => {
            setUser({
                id: res.data.id,
                username: res.data.username,
                email: res.data.email,
            });
            
        });
    }, []);

    const handleLogin = (usr: User) => {
        setUser(usr);
    };

    return (
        <Router>
            <div className="App">
                <NavBar user={user} login={handleLogin} />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route
                        path="/account"
                        render={(props) => <Account user={user} logout={handleLogin} />}
                    />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
