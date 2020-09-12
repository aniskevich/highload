const amqp = require('amqplib').connect(process.env.RABBIT_URI)

const INPUT_QUEUE = process.env.INPUT_QUEUE
const OUTPUT_QUEUE = process.env.OUTPUT_QUEUE

amqp
  .then(connection => connection.createChannel())
  .then(channel => {
    return channel.assertQueue(INPUT_QUEUE)
      .then(() => {
        return channel.consume(INPUT_QUEUE, message => {
          if (message !== null) {
            // some business logic
            amqp
              .then(connection => connection.createChannel())
              .then(ch => {
                ch.assertQueue(OUTPUT_QUEUE)
                  .then(() => {
                    ch.sendToQueue(OUTPUT_QUEUE, Buffer.from(message.content))
                    channel.ack(message)
                    ch.close()
                  })
              })
          }
        })
      })
  }).catch(console.warn)