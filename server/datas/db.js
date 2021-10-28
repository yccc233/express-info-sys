var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./express-info.db", function(e){
    if (e) throw e;
});


/**
 * 创建user_account表
 */
var createTable = "create table user_account (" +
    "id integer auto_increment," +
    "account varchar(10) not null," +
    "password varchar(20) not null," +
    "role varchar(1) not null default 0," +
    "userid integer primary key" +
    ");"



database.run(createTable);
setTimeout(() => database.close(), 1000);