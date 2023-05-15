const {readable} = require("node:stream")
const webservice = require(__dirname + "/../config/webservice.json")

module.exports = {
    login: login,
    signup: signup
}

function login(email, password) {
    const users = JSON.parse(require(__dirname + "/../db/users.json"))
    return readable.from(users).filter(user => user.email === email && user.password === password).readableLength === 1
}

//-1: Registration not allowed
//0: Successful
//1: Email Exist
//2: Username Exist
//3: Password to Easy
function signup(username, email, password) {
    if (!webservice.registration) return -1
    const users = JSON.parse(require(__dirname + "/../db/users.json"))
    if (readable.from(users).filter(user => user.email === email).readableLength === 1) return 1
    if (readable.from(users).filter(user => user.username === username).readableLength === 1) return 2
    users.push({username: username, email: email, password: password})
    fs.writeFileSync(__dirname + "/../db/users.json", JSON.stringify(users))
}