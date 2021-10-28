
import React from "react";
import {Button, Form, Input, Radio} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../css/login.css';
import {Link} from "react-router-dom";
const {Item} = Form;
const $ = require("jquery");

function Login(props) {
    
    const onSubmit = (params) => {
        console.log("submit", params);
        $.post("http://localhost:3005/login/verify", {
            account: params.account,
            password: params.password,
            role: params.role
        }).done(res => {
            console.log(res)
        });
    }
    
    return <>
        <div className={"box-body"}>
            <div className={"box-content"}>
                <h2 className={"title"}>欢迎登录</h2>
                <div className={"form-box"}>
                    <Form
                        layout={"vertical"}
                        onFinish={onSubmit}
                    >
                        <Item
                            label={"账户"}
                            name={"account"}
                            tooltip={"输入你的账户，长度不得超过十位"}
                            rules={[{
                                required: true,
                                message: "输入你的账户"
                            }]}
                        >
                            <Input placeholder={"//输入账户..."} prefix={<UserOutlined />}/>
                        </Item>
                        <Item
                            label={"密码"}
                            name={"password"}
                            tooltip={"输入你的密码"}
                            rules={[{
                                required: true,
                                message: "输入你的密码"
                            }]}
                        >
                            <Input.Password placeholder={"//输入密码..."} prefix={<LockOutlined />} />
                        </Item>
                        <Item
                            name={"role"}
                            initialValue={3}
                        >
                            <Radio.Group defaultValue={3}>
                                <Radio value={0}>收件人</Radio>
                                <Radio value={1}>快递员</Radio>
                                <Radio value={2}>工作人员</Radio>
                                <Radio value={3}>最高管理</Radio>
                            </Radio.Group>
                        </Item>
                        <Item
                            wrapperCol={{
                                offset: 5,
                                span: 16
                            }}
                        >
                            <Button type={"primary"} htmlType={"submit"}>登录</Button>
                            <span style={{marginLeft: "10px"}}>还没有账户啊！<Link to={"/register"} style={{textDecoration: "underline"}}>立即注册</Link></span>
                        </Item>
                        
                    </Form>
                </div>
            </div>
        </div>
    </>
}

export default Login;