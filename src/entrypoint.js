const express = require("express")
const router = express.Router()
const users = require("./users")
module.exports = class Entrypoint {
    constructor(path, method, permission, exercise) {
        this.path = path
        this.method = method
        this.permission = permission
        this.exercise = exercise
        switch (method) {
            case "get":
                router.get(path, this.entrypoint);
                break;
            case "post":
                router.post(path, this.entrypoint);
                break;
            case "put":
                router.put(path, this.entrypoint);
                break;
            case "delete":
                router.delete(path, this.entrypoint);
                break;
            case "all":
                router.all(path, this.entrypoint);
                break;
            default:
                console.error("Method " + method + " not supported")
                process.exit(10)

        }
    }

    entrypoint(req, res) {
        const authorised = this.checkPermission(req)
        if (!authorised) return res.send({"status": "failed"})
    }

    checkPermission(req) {
        const permission = this.permission
        if (permission === "0") return true
        if (permission === "login") {
            const email = req.cookies.email
            const password = req.cookies.password
            return users.login(email, password)
        }
    }
}