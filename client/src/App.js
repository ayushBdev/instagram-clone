import React from "react";
import Home from "./component/Home/Home";
import Upload from "./component/Upload/Upload";
import Profile from "./component/Profile/Profile";
import Auth from "./component/Auth/Auth";

import { Switch, Route } from "react-router-dom";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
    return (<>
            
        <ReactNotification />

        <Switch>

            <Route path="/" component={Home} exact/>
            <Route path="/auth" component={Auth} exact/>
            <Route path="/profile/:id" component={Profile} exact/>
            <Route path="/upload" component={Upload} exact/>

        </Switch>
    </>);
};

export default App;