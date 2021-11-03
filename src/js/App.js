import React from "react";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Cookie from "react-cookies";
import Login from "./login/Login";
import Register from "./login/Register";
import Homepage from "./home/Homepage";
import Notify from "./notify";
import '../css/App.css';

function App() {

    return (
        <>
            <BrowserRouter basename={"/"}>
                <Route exact path={"/"} component={() => (<Redirect to={"/login"} />)} />
                <Route path={"/login"} component={Login} />
                <Route path={"/register"} component={Register} />
                <Route path={"/homepage"} render={() => {
                    const userid = Cookie.load("userid");
                    if (!userid) Notify("error", "登陆时间过期啦，重新登陆！");
                    return userid ? <Homepage /> :
                        <Redirect to={'/login'} />;
                }} />
            </BrowserRouter>
        </>
    );
}

export default App;
