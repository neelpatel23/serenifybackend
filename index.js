const express = require('express');
const app = express();
const sampleData = require("./data.json");
let port = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/users", (req, res) => {
  res.send(
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    }
  )
})

app.listen(port, () => {
  console.log(`Serenify Backend Server is running on ${port}`)
})