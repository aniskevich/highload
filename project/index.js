const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const session = require('express-session')

const PORT = 3000

const passport = require('./controllers/auth')
const authRouter = require('./routes/auth')
const appRouter = require('./routes/app')

const app = express()

app.engine('hbs', handlebars({defaultLayout: 'layout'}))
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: "SECRET",
}))
app.use(passport.initialize)
app.use(passport.session)

app.use('/info', passport.checkAuth)

app.use('/', appRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
