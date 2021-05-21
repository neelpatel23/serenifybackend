const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const config = require('./config');
// const MongoClient = require('mongodb').MongoClient
const dailystories = require('./stories/dailystories.json');
const dashboardData = require('./dashboard/home/dashboardata.json')
let port = process.env.PORT || 8000;

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://neelp:<CSC603GwxtwjsXtm>@cluster0.bcu5n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

const todaysDate = moment().format('MMMM Do, YYYY');

serenifyBase.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

serenifyBase.get("/", auth(), (req, res) => {
  res.status(401)
  res.send("You are unauthorized to access this endpoint, please contact your developer.")
})

serenifyBase.get("/secure/token", (req, res) => {
  const payload = {
    name: "Serenify",
    token: "JWT_SIGN"
  };

  const token = jwt.sign(payload, config.JWT_SECRET);
  res.status(200)
  res.send(token)
})

serenifyBase.post("/users", (req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('node-demo');
    const collection = db.collection('users');
    collection
      .insertOne(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
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

serenifyBase.post('/addusers', auth(), (req, res) => {
  res.status(200)
  res.send(`This is what I've received: ${req.body.results.name}`)
});

serenifyBase.get('/daily/serenity', (req, res) => {
  res.status(200)
  res.send(dailystories)
})

serenifyBase.get('/dashboard_data', (req, res) => {
  res.status(206)
  res.send(dashboardData)
})
serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})