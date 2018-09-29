const fs = require("fs");
const db = require("./cassandraDB.js");
const JSONStream = require("JSONStream");
const filepath =
  "/Users/jones/Downloads/Hackreactor/hrsf101-system-design-capstone/Header/mockData3.json";
// const options = { flags: "r", encoding: "utf-8" };
const pipeline = fs.createReadStream(filepath).pipe(JSONStream.parse());

pipeline.on("data", data => db.insert(data));
