const express = require('express')

const AppController = require('../controllers/app')

const router = express.Router()

router.get('/', AppController.index)
router.get('/info', AppController.info)

module.exports = router