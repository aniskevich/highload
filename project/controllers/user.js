const User = require('../models/user')
const logger = require('../utils/logger') 

registrationForm = (req, res) => {
    const { error } = req.query
    res.render('registrationForm', { error })
}

registration = async (req, res) => {
    logger.write('Start: ', process.memoryUsage())
    const { email, password, repassword } = req.body
    if (password === repassword) {
        const user = new User(email, password)
        const msg = await user.create().catch(err => {
            logger.write('Fail: ', process.memoryUsage())
            res.redirect(`/auth/registration?error=${err.message}`)
        })
        if (msg) {
            logger.write('Success: ', process.memoryUsage())
            res.redirect('/auth')
        }
    } else {
        res.redirect('/auth/registration?error=Passwords don\'t match')
    }
}

loginForm = (req, res) => {
    const { error } = req.query
    res.render('loginForm', { error })
}

logout = (req, res) => {
    req.logout()
    res.redirect('/auth')
}

module.exports = {
    registrationForm,
    registration,
    loginForm,
    logout,
}