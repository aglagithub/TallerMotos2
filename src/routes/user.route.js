const express = require('express')

//controllers
const userController = require('../controllers/user.controller') 

const router = express.Router()

router.route('/')
    .get(userController.findAllUser)
    .post(userController.createUser)

router.route('/:id')
    .get(userController.findOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router