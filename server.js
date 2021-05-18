const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const config = require('./config');
const dailystories = require('./stories/dailystories.json');
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

const todaysDate = moment().format('MMMM Do, YYYY');

// const daily = [
// 	{
// 		url: 'https://neelp.sfo3.cdn.digitaloceanspaces.com/Serenify/stories/daily/daily4.jpeg',
//     type: 'image',
// 		header: {
// 			heading: 'Your Quotes by Serenify',
// 			subheading: todaysDate
// 		},
// 	},
//   {
//     url: 'https://neelp.sfo3.cdn.digitaloceanspaces.com/Serenify/stories/daily/daily5.jpeg',
//     type: 'image',
//     header: {
//       heading: 'Your Quotes',
//       subheading: todaysDate
//     }
//   },
//   {
//     url: 'https://neelp.sfo3.cdn.digitaloceanspaces.com/Serenify/stories/daily/daily2.jpeg',
//     type: 'image',
//     header: {
//       heading: 'Your Quotes',
//       subheading: todaysDate
//     }
//   },
// ];

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
serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})