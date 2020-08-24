const express = require('express')

const AppController = require('../controllers/app')
// const passport = require('../controllers/auth')

const router = express.Router()

router.get('/', AppController.index)

module.exports = router