const passport = require('passport')
const Strategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

passport.use(
    new Strategy({usernameField: 'email'}, async (email, password, done) => {
        let user = await User.getOne(email)
        if (!user) {
            return done(null, false)
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false)
        }
        const plainUser = JSON.parse(JSON.stringify(user))
        delete plainUser.password
        done(null, plainUser)
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    const usr = await User.getOne(user.email)
    done(null, usr)
})

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    authenticate: passport.authenticate('local', {
        successRedirect: '/info',
        failureRedirect: '/auth?error=Wrong credentials',
    }),
    checkAuth: (req, res, next) => {
        if (req.user) {
            next()
        } else {
            res.redirect('/auth')
        }
    }
}