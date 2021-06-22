import React from "react";

import Home from "./component/Home/Home";
import Upload from "./component/Upload/Upload";
import Profile from "./component/Profile/Profile";
import Auth from "./component/Auth/Auth";
import Error from "./component/Error/Error";

import { Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (<>
            
        <ToastContainer />

        <Switch>

            <Route path="/" component={Home} exact/>
            <Route path="/auth" component={Auth} exact/>
            <Route path="/profile/:id" component={Profile} exact/>
            <Route path="/upload" component={Upload} exact/>
            <Route component={Error} exact/>

        </Switch>
    </>);
};

export default App;