const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose =  require('mongoose');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const keys = require('./config');
const dailystories = require('./stories/dailystories.json');
const dashboardData = require('./dashboard/home/dashboardata.json');
const AuthRoute = require('./routes/auth');
const UserRoute = require('./routes/employee');
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

mongoose.connect('mongodb+srv://neelp:5iFVIUuBIGLcPQMo@rejuvenate.bcu5n.mongodb.net/rejuvenate?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
  console.log(err)
})

db.once('open', () => {
  console.log('Database connection Established')
})

const todaysDate = moment().format('MMMM Do, YYYY');


serenifyBase.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

serenifyBase.use('/auth/users', AuthRoute)
// serenifyBase.use('/auth/users', UserRoute)

serenifyBase.get("/", auth(), (req, res) => {
  res.status(401)
  res.send("You are unauthorized to access this endpoint, please contact your developer.")
})

// serenifyBase.get("/custom", (req, res) => {
//   res.set('Content-Type', 'text/html')
//   res.send(Buffer.from('<div style={{ background: "pink", padding: "20" }}> <h1 style={{ marginTop: 100%, marginBottom: 0 }}>🌝</h1><h1 style={{ marginTop: "5" }}>A custom title can go here.</h1></div>'))
// })

serenifyBase.get("/secure/token", (req, res) => {
  const payload = {
    name: "Serenify",
    token: "JWT_SIGN"
  };

  const token = jwt.sign(payload, keys.JWT_SECRET);
  res.status(200)
  res.send(token)
})

serenifyBase.get('/dashboard/data', (req, res) => {
  res.status(200)
  res.send(dashboardData)
})

serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})