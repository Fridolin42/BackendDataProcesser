const express = require("express")
const router = express.Router()
const users = require("./users")
const dbHandler = require("./dbHandler")
module.exports = class Entrypoint {
    static {
        //TODO read functions
    }
    static functions = []

    constructor(url, httpMethod, requiredPermission, exercise) {
        this.url = url
        this.method = httpMethod
        this.requiredPermission = requiredPermission
        this.functionName = exercise
        switch (httpMethod) {
            case "get":
                router.get(url, this.entrypoint);
                break;
            case "post":
                router.post(url, this.entrypoint);
                break;
            case "put":
                router.put(url, this.entrypoint);
                break;
            case "delete":
                router.delete(url, this.entrypoint);
                break;
            case "all":
                router.all(url, this.entrypoint);
                break;
            default:
                console.error("Method " + httpMethod + " not supported")
                process.exit(10)

        }
    }

    entrypoint(req, res) {
        if (this.requiredPermission === "login" && !this.checkPermission(req)) return res.send({"status": "failed"})
        Entrypoint.functions[this.functionName].execute(req, res)
    }

    checkPermission(req) {
        const permission = this.requiredPermission
        if (permission === "0") return true
        if (permission === "login") {
            const email = req.cookies.email
            const password = req.cookies.password
            return users.login(email, password)
        }
    }
}

class EntrypointFunction {

    constructor(name) {
        this.function = require("../config/entrypoints.json")
    }

    execute(req, res) {
        for (let dbPath of Object.keys(this.function)) {
            let dbPathParts = Array.from(dbPath)
            //parser for the path
            for (let i = 0; i < dbPathParts.length; i++) {
                const dbPathPart = dbPathParts[i]
                switch (dbPathPart) {
                    case '*': {
                        let end = null
                        for (let j = i + 1; j < dbPathParts.length; j++) {
                            if ('.,]'.includes(dbPathParts[j])) end = j
                        }
                        if (end == null) throw new Error("Wrong Syntax in entrypoints.json")
                        //i + 1 is correct, because I don't wont to have the '*' in my string
                        let key = dbPath.substring(i + 1, end)
                        let value = req.cookies[key]
                        dbPath = dbPath.substring(0, i) + value + dbPath.substring(end)
                    }
                }
            }

        }
    }
}