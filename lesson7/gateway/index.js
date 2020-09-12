const express = require('express')
const amqp = require('amqplib').connect(process.env.RABBIT_URI)

const INPUT_QUEUE = process.env.INPUT_QUEUE
const OUTPUT_QUEUE = process.env.OUTPUT_QUEUE
const PORT = process.env.PORT

const app = express()
app.use(express.json())

app.post('/:id', (req, res) => {
    amqp
        .then(connection => connection.createChannel())
        .then(channel => {
            channel.assertQueue(OUTPUT_QUEUE)
                .then(() => {
                    channel.sendToQueue(OUTPUT_QUEUE, Buffer.from(JSON.stringify({
                        id: req.params.id,
                        payload: req.body
                    })))
                    channel.close()
                })
        }).catch(err => console.log(err))
    res.send('OK')
})

amqp
    .then(connection => connection.createChannel())
    .then(channel => {
        return channel.assertQueue(INPUT_QUEUE)
            .then(() => {
                return channel.consume(INPUT_QUEUE, message => {
                    if (message !== null) {
                        const content = JSON.parse(message.content.toString())
                        console.log(`Processing ${content.id} completed`)
                        channel.ack(message)
                    }
                })
            })
    }).catch(console.warn)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))