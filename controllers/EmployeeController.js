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

// Create New Employee

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
            designation: req.body.post
        })
        user.save()
        .then(response => {
            res.json({
                message: 'User Created Successfully \n\n Logging In'
            })
        })
        .catch(error => {
            res.json({
                message: "An Unknown Error Occurred "
            })
        })
    })
}


// Update User Info

const update = (req, res, next) => {
    let userID = req.body.userID

    let updatedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPass,
        designation: req.body.post
    }

    UserDetail.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'User Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An unknown error occurred'
        })
    })
}


// delete an employee 

const destroy = (req, res, next) => {
    let userID = req.body.userID
    UserDetail.findOneAndRemove(userID)
    .then(() => {
        req.json({
            message: 'User Deleted Successfully'
        })
    }) 
    .catch(error => {
        req.json({
            message: 'An unknown error occurred'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}