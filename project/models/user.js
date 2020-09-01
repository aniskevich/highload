const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

class User {
    constructor(email, password) {
        this.email = email
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        this.password = bcrypt.hashSync(password, salt)
    }

    async create() {
        const fileName = path.resolve(__dirname, '..', 'mock', 'user.json')
        const users = JSON.parse(fs.readFileSync(fileName, 'utf8'))
        if (users.some(user => user.email === this.email)) {
            throw new Error('User already exists')
            return null
        }
        else {
            users.push(this)
            fs.writeFile(fileName, JSON.stringify(users), (err) => {
                if (err) throw err
            })
            return 'success'
        }
    }

    static get() {
        // TODO
    }

    static getOne(email) {
        const fileName = path.resolve(__dirname, '..', 'mock', 'user.json')
        const users = JSON.parse(fs.readFileSync(fileName, 'utf8'))
        const user = users.filter(user => user.email === email)
        if (!user.length) return null
        else return user[0]
    }

    update() {
        // TODO
    }

    delete() {
        // TODO
    }
}

module.exports = User
