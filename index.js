const express = require('express');
const app = express();
const sampleData = require("./data.json");
let port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.headersSent('Access-Control-Allow-Origin')
    res.send("Hello World")
})

app.get("/users", (req, res) => {
    res.send(sampleData)
})

app.listen(port, () => {
    console.log(`Serenify Backend Server is running on ${port}`)
})