const path = require('path')
const fs = require('fs')
const os = require('os')

const fileName = path.resolve(__dirname, '..', 'logs', 'memory.log')

const convertMessage = message => {
    const formattedObj = Object.entries(message).map(([key, value]) => {
        return `${key}: ${Math.round(value / 1024 / 1024 * 100) / 100} mb`
    })
    return JSON.stringify(formattedObj)
}

const write = (type, message) => {
    const msg = convertMessage(message)
    const log = `${type} ${msg}`
    fs.appendFile(fileName, log + os.EOL, (err) => {
        if (err) throw err
    })
}

module.exports = {
    write,
}