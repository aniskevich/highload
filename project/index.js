const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')

const PORT = 3000

const authRouter = require('./routes/auth')
const appRouter = require('./routes/app')

const app = express()

app.engine('hbs', handlebars({defaultLayout: 'layout'}))
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.use('/', appRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
