/**
 * 操作数据库的，也就是建设数据库结构和管理等，也方便数据调整
 * 2021年10月28日 15:23:13
 */

var sqlite3 = require("sqlite3").verbose();
var database = new sqlite3.Database("./database1.db", function(e){
    if (e) throw e;
});


var selectall = "select * from user_account;";
/**
 * 创建user_account表
 */
var createTableSQL_user_account = "create table user_account (" +
    "userid integer primary key," +
    "account varchar(10) not null unique," +
    "password varchar(20) not null," +
    "role varchar(1) not null" +
    ");"

// console.log(createTableSQL_user_account)

var createTableSQL_user_info = "create table user_info (" +
    "id integer primary key," +
    "userid integer references user_account(userid)," +
    "email varchar(20) not null," +
    "name varchar(10) not null," +
    "gender varchar(6)," +
    "birth varchar(10)," +
    "phone varchar(13) not null," +
    "address varchar(50)" +
    ");"

var insert_user_info = "insert into user_info (userid, email, name, gender, birth, phone, address) " +
    "values (2, '1099312164', 'ycc', 'male', '1999/07', '15886920', '江苏南京');"

var insert_user_account = "insert into user_account (account, password, role) " +
    "values ('ycsc', '15886920', 1);"


// database.all(createTableSQL_user_info, (err, rows) => {
//     console.log(err, rows)
// });

database.all(selectall, (err, rows) => {
    console.log(rows)
});
setTimeout(() => database.close(), 100);