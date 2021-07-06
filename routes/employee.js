const express = require('express');
const router = express.Router();

const UserController = require('../controllers/EmployeeController')

router.get('/users', UserController.index)
router.post('/show', UserController.show)
router.post('/store', UserController.store)
router.post('/update', UserController.updateTopics)
router.post('/delete', UserController.destroy)

module.exports = router