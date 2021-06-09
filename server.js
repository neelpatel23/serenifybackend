const express = require('express');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const keys = require('./config');
const dailystories = require('./stories/dailystories.json');
const dashboardData = require('./dashboard/home/dashboardata.json');
const AuthRoute = require('./routes/auth');
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

serenifyBase.use('/api', AuthRoute)

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

  const token = jwt.sign(payload, keys.JWT_SECRET);
  res.status(200)
  res.send(token)
})

// serenifyBase.post('/users', (req, res) => {
//   if (req.query.username && req.query.email && req.query.age) {
//       console.log('Request received');
//       con.connect(function(err) {
//           con.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
//               if (err) res.send(err);
//               if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
//               if (fields) console.log(fields);
//           });
//       });
//   } else {
//       console.log('Missing a parameter');
//   }
// });

// serenifyBase.get('/users', (req, res) => {
//   con.connect(function(err) {
//       con.query(`SELECT * FROM main.users`, function(err, result, fields) {
//           if (err) res.send(err);
//           if (result) res.send(result);
//       });
//   });
// });

serenifyBase.get('/daily/serenity', (req, res) => {
  res.status(200)
  res.send(dailystories)
})
serenifyBase.get('/dash/rainymoods', (req, res) => {
  res.status(206)
  res.send("https://rainymood.com/audio1112/0.m4a")
})

serenifyBase.get('/dashboard_data', (req, res) => {
  res.status(206)
  res.send(dashboardData)
})
serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})