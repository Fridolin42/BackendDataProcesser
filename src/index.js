//express libs
const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
//config files
const webservice = require(__dirname + "/../config/webservice.json")
const databases = require(__dirname + "/../config/databases.json")

//middlewares
//middlewares from libs
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

//config
app.set("view engine", "ejs")

//read databases config
for (const database of databases) {
    for (const entrypoint of database.entrypoint) {
        const path = entrypoint.path
        const method = entrypoint.method
        const permission = entrypoint.permission
        const data = entrypoint.data
    }
}

//404
app.all("/", (req, res) => {
    res.status(404)
    res.send({
        "status": 404,
        "method": req.method,
        "path": req.path,
        "requestHead": req.headers,
        "requestBody": req.body
    })
})

//run
app.listen(webservice.port, () => console.log("App is running: http://localhost:" + webservice.port))