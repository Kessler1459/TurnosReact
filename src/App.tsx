import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Account from "./components/Account";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import User from "./User";
import Axios from "axios";
import { UserContext } from "./userContext";

function App() {
    const [user, setUser] = useState<User>({ id: null, username: null, email: null, admin: null });

    useEffect(() => {
        Axios.get("http://localhost:9000/account", {
            withCredentials: true,
        }).then((res) => {
            if(res.data.id){
                setUser({
                    id: res.data.id,
                    username: res.data.username,
                    email: res.data.email,
                    admin:res.data.admin,
                });
            }
        });
    }, [user.id]);

    const handleLogin = (usr: User) => {
        setUser(usr);
    };

    return (
        <Router>
            <div className="App">
                <UserContext.Provider value={{user:user,updateUser:setUser}}>
                <NavBar/>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route
                        path="/account"
                        render={(props) => (
                            <Account user={user} logout={handleLogin} />
                        )}
                    />
                </Switch>
                </UserContext.Provider>
            </div>
        </Router>
    );
}

export default App;
