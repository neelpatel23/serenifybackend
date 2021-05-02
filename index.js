const express = require('express');
const serenifyBase = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());


serenifyBase.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

serenifyBase.get("/", (req, res) => {
  res.status(401)
  res.send("You are unauthorized to access this endpoint, please contact your developer.")
})

serenifyBase.get("/users", (req, res) => {
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

serenifyBase.get(`/assets/images/${1}`, (req, res) => {
  res.status(200)
  res.send("https://api.pcloud.com/getpubthumb?code=ujY&linkpassword=undefined&size=515x485&crop=0&type=auto")
  res.send(req.header)
})

serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})