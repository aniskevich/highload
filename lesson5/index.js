const express = require('express')
const redis = require('redis')
const https = require('https')

const app = express()
const PORT = process.env.PORT || 3000
const client = redis.createClient(process.env.REDIS_URI)
const API_URI = 'https://jsonplaceholder.typicode.com/posts'

client.on('connect', () =>  console.log('Redis connected'))
client.on('error', error =>  console.error(error))

app.get('/:id', (req, res) => {
    client.get(req.params.id, (err, reply) => {
        if (!reply) {
            console.log('no cache found')
            https.get(`${API_URI}/${req.params.id}`, (response) => {
                response.on('data', (data) => {
                    client.set(req.params.id, data)
                    res.json(JSON.parse(data))
                })
            }).on('error', (err) => {
                console.error(err)
            })
        } else {
            console.log('from cache')
            res.json(JSON.parse(reply))
        } 
    })    
})

app.get('/', (req, res) => {
    res.send('Please add id (/1)')
})

app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
})