const express = require('express')

//controllers
const repairController = require('../controllers/repair.controller')

const router = express.Router();
router.route('/')
    .get(repairController.findAllRepairs)
    .post(repairController.createRepair)

router.route('/:id')
    .get(repairController.findOneRepair)
    .patch(repairController.updateRepair)
    .delete(repairController.deleteRepair)

module.exports = router; 