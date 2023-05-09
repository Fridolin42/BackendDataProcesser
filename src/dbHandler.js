const fs = require("fs")
const databases = require(__dirname + "/../config/databases.json")

module.exports = class db {
    //name of db
    constructor(name) {
        this.dbName = name
        this.path = __dirname + "/../db/" + name + ".json"
        if (!fs.existsSync(this.path)) this.initDB()
    }

    //path: The path in the object where you want to paste the data.
    //data: The data that will be pasted inside the object.
    addData(path, data) {
        let obj = JSON.parse(fs.readFileSync(this.path, {encoding: "utf8"}))
        let parts = path.split("/");
        let current = obj;
        let lastPartIndex = parts.length - 1;

        for (let i = 0; i < lastPartIndex; i++) {
            let part = parts[i];

            if (!current[part]) {
                if (Number.isInteger(parseInt(parts[i + 1]))) {
                    current[part] = [];
                } else {
                    current[part] = {};
                }
            }

            current = current[part];
        }

        let lastPart = parts[lastPartIndex];
        if (Array.isArray(current[lastPart])) {
            current[lastPart].push(data);
        } else {
            current[lastPart] = data;
        }

        return obj;
    }


    //path: The path to the data in the object you want to get
    readData(path) {
        let object = JSON.parse(fs.readFileSync(this.path, {encoding: "utf8"}))
        let parts = path.split("/")
        let current = object
        for (const part of parts) {
            current = current[part]
        }
        return current
    }

    initDB() {
        if (databases.db[this.dbName].type === "object") {
            fs.writeFileSync(this.path, "{}")
        } else {
            fs.writeFileSync(this.path, "[]")
        }
    }
}