const bcrypt = require('bcryptjs')

const SALT_ROUNDS = 12

class User {
    constructor(email, password) {
        this.email = email
        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        this.password = bcrypt.hashSync(password, salt)
    }

    create() {

    }

    get() {

    }

    getOne() {

    }

    update() {

    }

    delete() {

    }
}

module.exports = User
