const fs = require("fs")

class db {
    constructor(name) {
        this.path = __dirname + "/../db/" + name + ".json"
        if (!fs.existsSync(this.path)) this.initDB()
    }

    //TODO
    // initDB(path) {
    //     let db;
    //     let structure = this.getStructure(path)
    //     if (structure.type === "object") db = {}
    //     if (structure.type === "list") db = []
    //      -
    //     if (structure.type === "object") {
    //         for (const childName of structure.children) {
    //             db[childName] = this.initDB(path + "/" + childName)
    //         }
    //     }
    //     if (structure.type === "list") {
    //      -
    //     }
    //      -
    //     if (this.getStructure().type === "value") db = []
    //      -
    //     return db
    // }

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

    readData(path) {
        let object = JSON.parse(fs.readFileSync(this.path, {encoding: "utf8"}))
        let parts = path.split("/")
        let current = object
        for (const part of parts) {
            current = current[part]
        }
        return current
    }
}