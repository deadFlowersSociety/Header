require("newrelic");
const cluster = require("cluster");
// const os = require("os");
const express = require("express");
const cors = require("cors");

// if (cluster.isMaster) {
//   // const cpuCount = os.cpus().length;
//   const cpuCount = 3;
//   for (var i = 0; i < cpuCount; i++) {
//     cluster.fork();
//   }
// } else {
const app = express();
app.use(cors());
const bodyParser = require("body-parser");

const HeaderDB = require("../database/postgresqlDB.js");

app.use(bodyParser.json());
app.use(express.static(__dirname + "/../public/dist"));
// app.use("/:artistID", express.static(__dirname + "../public/dist"));

// Upon GET request to '/artist/:artistID', queries the HeaderDB (mongoDB) and sends back artistObj.
app.get("/api/artists/header/:artistID", (req, res) => {
  HeaderDB.find(req.params.artistID, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.set("Cache-Control", "public, max-age=86400");
      res.status(200);
      res.send(results);
    }
  });
});
app.post("/api/artists/header", (req, res) => {
  HeaderDB.insert(req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.status(201);
      res.send("Inserted " + req.body);
    }
  });
});
app.put("/api/artists/header/:artistID", (req, res) => {
  HeaderDB.update(req.params.artistID, req.body, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.status(201);
      res.send("Updated " + req.body);
    }
  });
});
app.delete("/api/artists/header/:artistID", (req, res) => {
  HeaderDB.remove(req.params.artistID, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else {
      res.status(201);
      res.send("Deleted " + req.body);
    }
  });
});

app.listen(process.env.PORT || 3004, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info(
    `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env.PORT ||
      3004}/ in your browser.`
  );
});
module.exports = app;
// }

// cluster.on("exit", worker => {
//   console.log(`${worker.id} no longer exists!`);
//   cluster.fork();
// });
