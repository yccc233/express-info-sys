const router = require("express").Router();
const postParse = require('../utils')().postParse;
var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./server/datas/database.db", function(e){
    if (e) throw e;
});

router.post("/verify", function (req, res) {
    req.on("data", data => {
        let params = postParse(data.toString());
        // console.log("params", params)
        let sql = `select * from user_account where account='${params.account}';`;
        // console.log("sql", sql)
        database.all(sql, (err, rows) => {
            if (err) {
                res.end(JSON.stringify({
                    code: -1,
                    message: "ERROR: " + err.toString(),
                    data: ""
                }))
                throw err;
            }
            console.log("rows:", rows)
            if (rows.length > 0) {
                let info = rows[0];
                let data = {
                    type: 1,
                    describe: "password Error or role Error!"
                }
                if (params.password === info.password && params.role === info.role)
                    data = {
                        type: 0,
                        describe: "success"
                    }
                res.end(JSON.stringify({
                    code: 0,
                    message: "success",
                    data: data
                }))
                
            } else {
                res.end(JSON.stringify({
                    code: 0,
                    message: "success",
                    data: {
                        type: 1,
                        describe: "not exist"
                    }
                }))
            }
        })
    });
});


module.exports = router;