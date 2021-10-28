import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Login from "./login/Login";

import './css/App.css';

function App() {
    return (
        <>
            <BrowserRouter basename={"/"}>
                <Route path={"/login"} component={Login} />
                <Route exact path={"/"} component={() => (<Redirect to={"/login"} />)} />
            </BrowserRouter>
        </>
    );
}

export default App;
