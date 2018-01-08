var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
var port = process.env.PORT || 3010;

import fetchAuditLogs from '../cassandra/fetchAuditLogs'


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port);

app.post('/getAuditLogs', async function (req, res,next) {
    let logs = await fetchAuditLogs();
    console.log(req.body.skip);
    res.json(logs);
});

console.log('todo list RESTful API server started on: ' + port);