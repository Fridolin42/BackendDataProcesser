//express libs
const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
//config files
const webservice = require(__dirname + "/../config/webservice.json")

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