process.env.NODE_ENV = "development";
require('./common/mongodb');

var express = require('express');
var app = express();

const config = require('./common/config');
const v1 = require('./routes/v1');

app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/', v1);

app.use("*", function (req, res, next) {
    res.send("API Not Found");
});

app.listen(process.env.PORT || config.PORT, function () {
    console.log("Node RESTful API server started on " + config.PORT);
})

module.exports = app;