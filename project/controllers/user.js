const User = require('../models/user')

registrationForm = (req, res) => {
    const { error } = req.query
    res.render('registrationForm', { error })
}

registration = async (req, res) => {
    const { email, password, repassword } = req.body
    if (password === repassword) {
        const user = new User(email, password)
        await user.create().catch(err => res.redirect(`/auth/registration?error=${err.message}`))
        res.redirect('/auth')
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