const fs = require("fs");
const db = require("./cassandraDB.js");
const JSONStream = require("JSONStream");

var filepath =
  "/Users/jones/Downloads/Hackreactor/hrsf101-system-design-capstone/Header/mockData10.json";
// const options = { flags: "r", encoding: "utf-8" };
var pipeline = fs.createReadStream(filepath).pipe(JSONStream.parse());
pipeline.on("data", data => db.insert(data));
