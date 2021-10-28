const express = require('express');
const cors = require('cors');
const {serverPort} = require('../src/config');
const app = express();

//解决CORS跨域请求
app.use(cors());
app.set('port', serverPort);

app.use("/login", require("./api/login"));

app.listen(app.get('port'), () => {
    console.log(`start the server at: http://127.0.0.1:${app.get('port')}/`);
});

