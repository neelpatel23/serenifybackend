const UserDetail = require('../models/Employee');
const bcrypt =  require('bcryptjs');

const index = (req, res, next) => {
    UserDetail.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occurred '
        })
    })
}

const show = (req, res, next) => {
    let userID = req.body.userID
    UserDetail.findById(userID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An Unknown Error Occurred '
        })
    })
}
async function auth (req, res, next) {
    let email = req.body.email
    const foundUser = await UserDetail.findOne ({ "email" : 'neelp2023@gmail.com', "password": "Himalineel2" });
    res.send(foundUser)
}

// Create New User

const store = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }
        let user = new UserDetail({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPass,
            designation: req.body.post,
            isonboarded: 0,
            topics: req.body.topics
        })
        user.save()
        .then(response => {
            res.send(response)
        })
        .catch(error => {
            res.json({
                message: "An Unknown Error Occurred "
            })
        })
    })
}


// Update User Info

const updateTopics = (req, res, next) => {
    {
        let userID = req.body.userID

        let updateUserTop = {
            onboardinglevel: req.body.stringstatus,
            isonboarded: req.body.boolstatus,
            topics: req.body.topics
        }

        UserDetail.findByIdAndUpdate(userID, {$set: updateUserTop})
        .then(() => {
            res.json({
                message: 'User Updated Successfully'
            })
        })
        .catch(error => {
            res.json({
                error
            })
        })
    }
}

// const login = (req, res, next) => {
//     {
//     let email = req.body.email
//     let password = req.body.password

//     UserDetail.findOne({ email })
//     }
// }


// delete an employee 

const destroy = (req, res, next) => {
    let userID = req.body.userID
    UserDetail.findByIdAndRemove(userID)
    .then(() => {
        res.json({
            message: 'User Deleted Successfully'
        })
    }) 
    .catch(error => {
        res.json({
            message: 'An unknown error occurred'
        })
    })
}

module.exports = {
    index, show, store, updateTopics, destroy, auth
}