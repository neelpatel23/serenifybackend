const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const serenifyBase = express();
const jwt = require('jsonwebtoken');
const auth = require('./auth-middleware');
const config = require('./config');
let port = process.env.PORT || 8000;

serenifyBase.use(bodyParser.urlencoded({ extended: true }));
serenifyBase.use(bodyParser.json());

const todaysDate = moment().format('MMMM Do, YYYY');

const dailyserenity = [
	{
		url: 'https://p-def7.pcloud.com/cBZ57t2tDZwFVqUTZ5zxL7ZZG34Xv7ZQ5ZZUV0ZkZswCo7Zf5ZNXZr0ZP5ZQ7ZdZ4kZrpZtHZBzZyzZepZU7ZeVZ4KgeXZu9u1wo1j2zQFbDWdb2USqYb5uoJk/production%20ID_4327208.mp4',
    type: "video",
		header: {
			heading: 'The Serenify Team',
			subheading: todaysDate
		},
	},
];

serenifyBase.use((req, res, next) => {
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

serenifyBase.get('/daily/serenity/url', (req, res) => {
  res.status(200)
  res.send("https://pause.sfo2.cdn.digitaloceanspaces.com/Other/Adhiveshan%20Website/Stories/KM/Divine-Moods/Divine%20Moods%20%283_21%29.mp4")
  //https://pause.sfo2.cdn.digitaloceanspaces.com/Other/Adhiveshan%20Website/Stories/KM/Divine-Moods/yt1s_com_Guruhari_Darshan_1113_Jan_2021_Nenpur_India_1080p_3.mp4
})
serenifyBase.get('/daily/serenity/team/name', (req, res) => {
  res.status(200)
  res.send("The Serenify Team")
})

serenifyBase.listen(port, () => {
  console.log(`Serenify Backend Server is running on port: ${port}`)
})