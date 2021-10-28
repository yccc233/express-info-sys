/**
 * 操作数据库的，也就是建设数据库结构和管理等，也方便数据调整
 * 2021年10月28日 15:23:13
 */

var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./database.db", function(e){
    if (e) throw e;
});


/**
 * 创建user_account表
 */
var createTableSQL = "create table user_account (" +
    "id integer primary key," +
    "account varchar(10) not null," +
    "password varchar(20) not null," +
    "role varchar(1) not null" +
    ");"

console.log(createTableSQL)

database.run(createTableSQL);
setTimeout(() => database.close(), 100);