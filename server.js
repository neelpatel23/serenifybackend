const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const keys = require('./config');
const mysql = require('mysql');
const dailystories = require('./stories/dailystories.json');
const dashboardData = require('./dashboard/home/dashboardata.json')
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

const todaysDate = moment().format('MMMM Do, YYYY');



// const con = mysql.createConnection({
//   host: keys.DB_INSTANCE_HOST,
//   user: keys.DB_INSTANCE_USER,
//   password: keys.DB_INSTANCE_KEY
// });

// con.connect(function(err) {
//   if (err) throw err;

//   con.query('CREATE DATABASE IF NOT EXISTS main;');
//   con.query('USE main;');
//   con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
//   });
//   // con.end();
// });

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

serenifyBase.get('/background/morning', (req, res) => {
  res.status(200)
  res.send("https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2020/01/Colorful-vector-landscape-wallpapers-V24ByArthur1992aS-768x1662.png?ezimgfmt=ng:webp/ngcb34")
})

serenifyBase.get('/background/afternoon', (req, res) => {
  res.status(200)
  res.send("https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2019/09/mountain-valley-iphone-wallpaper-axellvak-sunset-deer-768x1731.jpg?ezimgfmt=ng:webp/ngcb34")
})

serenifyBase.get('/background/evening', (req, res) => {
  res.status(200)
  res.send("https://cdn-0.idownloadblog.com/ezoimgfmt/media.idownloadblog.com/wp-content/uploads/2019/09/mountain-valley-iphone-wallpaper-axellvak-night-mountain-deer-768x1731.jpg?ezimgfmt=ng:webp/ngcb34")
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