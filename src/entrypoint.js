const express = require("express")
const router = express.Router()
module.exports = class Entrypoint {
    constructor(path, method, db, data) {
        this.path = path
        this.method = method
        this.db = db
        this.data = data
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
        const db = require(__dirname + "/../" + this.db)
        // const folders =
    }
}