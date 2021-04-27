const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
      "name": "Entry Name",
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

app.post('/addusers', (req, res) => {
  res.status(200)
  res.send(`${req.body}`)
});


app.listen(port, () => {
  console.log(`Serenify Backend Server is running on ${port}`)
})