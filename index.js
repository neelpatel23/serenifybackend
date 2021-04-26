const app = require('express')();
const PORT = 8080;

app.listen(
    PORT, 
    () => console.log(`Serenify Backend is running on port ${PORT}`)
)

app.get('/users', (req, res) => {
    res.status(200).send({
         usersName: "Neel",
         email: "email",
    })
})