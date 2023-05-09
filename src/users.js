const {readable} = require("node:stream")

module.exports = {
    login: login,
    signup: signup
}

function login(email, password) {
    const users = require(__dirname + "/../db/users.json")
    return readable.from(users).filter(user => user.email === email && user.password === password).readableLength === 1
}

function signup(username, email, password) {

}