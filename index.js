const express = require('express');
const bodyParser = require('body-parser');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const config = require('./config');
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

serenifyBase.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

serenifyBase.get("/", (req, res) => {
  res.status(401)
  res.send("You are unauthorized to access this endpoint, please contact your developer.")
})

serenifyBase.get("/secure/token", (req, res) => {
  const payload = {
    name: "Serenify"
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.send(token)
})

serenifyBase.get("/users", auth(), (req, res) => {
  res.send({
    "name": "Neel Patel",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  });
})

serenifyBase.post('/addusers', (req, res) => {
  res.status(200)
  res.send(`This is what I've received: ${req.body.results.name}`)
});


serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})