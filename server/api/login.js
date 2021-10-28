const router = require("express").Router();
const postParse = require('../utils')().postParse;
const fs = require('fs');
const config = require("../../src/config");

const filePath = "../server/datas/user.json";

/**
 * 写入文件
 * @param path 文件路径
 * @param str 写入内容，string格式
 * @param success 成功回调
 * @param failure 失败回调
 */
function write(path, str, success, failure) {
    fs.writeFile(path, str, err => {
        if (err) failure(err);
        else success();
    });
}

/**
 * 读取文件操作
 * @param path 文件路径
 * @param success 成功回调
 * @param failure 失败回调
 */
function read(path, success, failure) {
    fs.readFile(path, 'utf-8', (err, str) => {
        if (err) failure(err);
        else success(str);
    });
}


router.post("/verify", function (req, res) {
    req.on("data", data => {
        let params = postParse(data.toString());
        //业务逻辑
        read(filePath, (str) => {
            if (!str) {
                res.end(JSON.stringify({
                    code: config.serverCode.ok,
                    message: "",
                    data: JSON.stringify({
                        success: 1,
                        reason: "please register!"
                    })
                }));
                return;
            }
            let users = JSON.parse(str)
            let ret = {};
            let tarUser = users["users"].find(u => u.account === params.account);
            if (tarUser) {
                if (tarUser.password === params.password) {
                    ret = {
                        code: config.serverCode.ok,
                        message: "",
                        data: JSON.stringify({
                            success: 0,
                            reason: "ok!"
                        })
                    };
                } else {
                    ret = {
                        code: config.serverCode.ok,
                        message: "",
                        data: JSON.stringify({
                            success: 2,
                            reason: "password is wrong!"
                        })
                    };
                }
            } else {
                ret = {
                    code: config.serverCode.ok,
                    message: "",
                    data: JSON.stringify({
                        success: 1,
                        reason: "please register!"
                    })
                }
            }

            res.end(JSON.stringify(ret));
        }, (err) => {
            res.end(JSON.stringify({
                code: config.serverCode.readFileErr,
                message: err.code + ": read fail!",
                data: ""
            }));
        });
    });
});

router.post("/register", function (req, res) {
    req.on("data", data => {
        let params = postParse(data.toString())

        let user = {
                account: params.account,
                password: params.password,
                name: params.account
            };

        read(filePath, (str) => {
            let users = JSON.parse(str);
            if (!!str) {
                let tarUser = users["users"].find(u => u.account === user.account);
                if (tarUser) {
                    res.end(JSON.stringify({
                        code: config.serverCode.ok,
                        message: "fail",
                        data: ""
                    }));
                    return;
                }
            }
            users["users"].push(user);
            write(filePath, JSON.stringify(users), () => {
                res.end(JSON.stringify({
                    code: config.serverCode.ok,
                    message: "success",
                    data: ""
                }));
            }, (err) => {
                res.end(JSON.stringify({
                    code: config.serverCode.writeFileErr,
                    message: err.code + ":write fail！",
                    data: ""
                }));
            });
        }, (err) => {
            res.end(JSON.stringify({
                code: config.serverCode.readFileErr,
                message: err.code + ": read fail!",
                data: ""
            }));
        });
    });
});


router.post("/admin", function (req, res) {
   req.on("data", data => {
       let params = postParse(data.toString());

       if (params.command === undefined) {
           res.end(JSON.stringify({
               code: config.serverCode.noParams,
               message: "没有期望的参数！",
               data: ""
           }));
       }
       if (params.command === config.adminCommand) {
           res.end(JSON.stringify({
               code: config.serverCode.ok,
               message: "",
               data: 1
           }));
       } else {
           res.end(JSON.stringify({
               code: config.serverCode.ok,
               message: "",
               data: 0
           }));
       }
   }) ;
});


module.exports = router;