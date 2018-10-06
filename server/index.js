require("newrelic");
const cluster = require("cluster");
const os = require("os");
const express = require("express");
const cors = require("cors");

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.use(cors());
  // *************webpack-hot-middleware set-up*******************
  // // Step 1: Create & configure a webpack compiler

  // const webpack = require('webpack');
  // const webpackConfig = require('../webpack.config');
  // const compiler = webpack(webpackConfig);

  // // Step 2: Attach the dev middleware to the compiler & the app
  // app.use(
  //   require('webpack-dev-middleware')(compiler, {
  //     logLevel: 'warn',
  //     publicPath: webpackConfig.output.publicPath
  //   })
  // );

  // // Step 3: Attach the hot middleware to the compiler & the app
  // app.use(
  //   require('webpack-hot-middleware')(compiler, {
  //     log: console.log,
  //     path: '/__webpack_hmr',
  //     heartbeat: 10 * 1000
  //   })
  // );
  // SOURCE: https://github.com/webpack-contrib/webpack-hot-middleware/tree/master/example
  // ************************************
  const bodyParser = require("body-parser");

  //TODO replace HeaderDB with postgresqlDB or cassandraDB
  const HeaderDB = require("../database/postgresqlDB.js");

  app.use(bodyParser.json());
  app.use(express.static(__dirname + "/../public/dist"));
  // app.use("/:artistID", express.static(__dirname + "../public/dist"));

  // Upon GET request to '/artist/:artistID', queries the HeaderDB (mongoDB) and sends back artistObj.
  app.get("/artists/:artistID", (req, res) => {
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
  app.post("/artists", (req, res) => {
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
  app.put("/artists/:artistID", (req, res) => {
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
  app.delete("/artists/:artistID", (req, res) => {
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
      `==> 🌎 Listening on port %s. Open up http://127.0.0.1:${process.env
        .PORT || 3004}/ in your browser.`
    );
  });
  module.exports = app;
}

cluster.on("exit", worker => {
  console.log(`${worker.id} no longer exists!`);
  cluster.fork();
});
