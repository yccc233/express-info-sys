const express = require('express');
const cors = require('cors');
const app = express();

//解决CORS跨域请求
app.use(cors());
app.set('port', 3005);

app.use("/login", require("./api/login"));
app.use("/select", require("./api/getInfo"));

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
});




