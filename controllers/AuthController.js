const User = require('../models/User');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if(err) {
            res.json({
                error: err
            })
        }
        let user = new User ({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPass,
            firebaseID: req.body.firebaseID,
            onboardinglevel: 'none',
            isonboarded: false,
            pushNotifications: '0',
            topics: req.body.topics
        })
        user.save()
        .then(user => {
            let token = jwt.sign(user.email, 'password')
            res.json({
                message: 'User Created Successfully',
                message0: user._id,
                token,
                user
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured while creating User"
            })
        })
         
    })
}

// /auth/users/register
// /auth/users/login
// /auth/users/update

const login = (req, res, next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({'email': email})
    .then(user => {
        if(user){
             bcrypt.compare(password, user.password, function(err, result){
                  if(err){
                      res.json({
                          error: err 
                      })
                  }
                  if(result){
                    let token = jwt.sign({fistname: user.firstname}, 'password')
                    res.json({
                        message: "Login Succeded",
                        user,
                        token
                    })
                  }else{
                      res.json({
                          message: "Incorrect Email and or Password"
                      })
                  }
             })
        }else{
            res.json({
                message: "Incorrect Email/Password"
            })
        }
    })
}

const update = (req, res, next) => {
    {
        let userID = req.body.userID

        let updateUserTop = {
            onboardinglevel: req.body.stringstatus,
            isonboarded: req.body.boolstatus,
            topics: req.body.topics,
            pushNotifications: req.body.notifs
        }

        User.findByIdAndUpdate(userID, {$set: updateUserTop})
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

const findUserDetails = (req, res, next) => {
    let userID = req.body.userID
    User.findById(userID)
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

module.exports = {
    register, login, update, findUserDetails
}
