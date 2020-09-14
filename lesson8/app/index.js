const express = require('express')
const Influx = require('influx')
const os = require('os')

const influx = new Influx.InfluxDB({
    host: 'influxdb',
    database: 'telegraf',
    schema: [
        {
          measurement: 'response_times',
          fields: {
            path: Influx.FieldType.STRING,
            duration: Influx.FieldType.INTEGER
          },
          tags: [
            'host'
          ]
        }
      ]
  })

const app = express()

app.use((req, res, next) => {
    const start = Date.now()
  
    res.on('finish', () => {
      const duration = Date.now() - start
      console.log(`Request to ${req.path} took ${duration}ms`)
  
      influx.writePoints([
        {
          measurement: 'response_times',
          tags: { host: os.hostname() },
          fields: { duration, path: req.path },
        }
      ]).catch(err => {
        console.error(`Error saving data to InfluxDB! ${err.stack}`)
      })
    })
    return next()
  })

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen('80')