const express = require('express')
const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const app = express()
const PORT = process.env.PORT || 3000


const redisClient = redis.createClient(process.env.REDIS_URI)
 
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)

app.get('/', (req, res) => {
    res.send(`${process.env.APP_NAME}`)
})

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})