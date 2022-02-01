const mongoose = require('mongoose');
const config = require("./config");

mongoose.connect(config.URL, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log("Database is connected ... \n\n")
})

module.exports = con;