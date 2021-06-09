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
            password: hashedPass
        })
        user.save()
        .then(user => {
            res.json({
                message: "User Created Successfully!"
            })
        })
        .catch(error => {
            res.json({
                message: "An error occured while creating User"
            })
        })
         
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}]})
    .then(user => {
        if(user){
             bcrypt.compare(password, user.password, function(err, result){
                  if(err){
                      res.json({
                          error: err 
                      })
                  }
                  if(result){
                    let token = jwt.sign({fistname: user.firstname}, 'password', {expiresIn: '1h'})
                    res.json({
                        message: "Login Succeded",
                        token
                    })
                  }else{
                      res.json({
                          message: "Password do not match"
                      })
                  }
             })
        }else{
            res.json({
                message: "No User Exists"
            })
        }
    })
}

module.exports = {
    register, login
}
