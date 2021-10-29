
import React from "react";
import cookie from "react-cookies";
import Notify from "../notify";
import {Route} from "react-router-dom";
import Topbar from "./Topbar";

const $ = require("jquery");

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: undefined,
            account: undefined,
            name: undefined
        }
    }
    
    componentDidMount() {
        console.log(cookie.load("userid"))
        $.post("http://localhost:3005/select/getAccountById", {userid: cookie.load("userid")}).done(res => {
            console.log(res)
            res = JSON.parse(res)
            if (res.code === 0) {
                cookie.save("account", res.data.account);
                cookie.save("role", res.data.role);
                this.setState({
                    role: res.data.role,
                    account: res.data.account,
                    name: res.data.name
                })
            } else {
                Notify("error", res.message);
            }
        });
    }
    
    render() {
        if (! this.state.role) return null;
        return (
            <div>
                <Topbar account={this.state.account} name={this.state.name} role={this.state.role}/>
            </div>
        );
    }
}

export default Homepage;