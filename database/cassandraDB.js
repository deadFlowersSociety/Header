var ExpressCassandra = require("express-cassandra");
var models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "spotify",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

var Artist = models.loadSchema("Artist", {
  fields: {
    artistID: "float",
    artistName: "text",
    followed: "boolean",
    followersNumber: "float",
    verified: "boolean",
    artistImages: {
      type: "frozen",
      typeDef: "<list<text>>"
    },
    Biography: "text",
    Where: {
      type: "map",
      typeDef: "<text, float>"
    }
  },
  key: ["artistID"]
});

Artist.syncDB(function(err, res) {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

var insert = (artistObj, callback) => {
  var artist = new Artist(artistObj);
  artist.saveAsync(callback);
};

var update = (id, body, callback) => {
  Artist.update({ artistID: id }, body, callback);
};
var remove = (id, callback) => {
  Artist.delete({ artistID: id }, callback);
};
var find = (id, callback) => {
  Artist.findOne({ artistID: id }, callback);
};

// models.import(
//   "/Users/jones/Downloads/Hackreactor/hrsf101-system-design-capstone/Header/database/data/mockDataTest.json",
//   { batchSize: 10 },
//   function(err) {
//     if (err) {
//       console.log(err);
//     }
//   }
// );

module.exports.find = find;
module.exports.update = update;
module.exports.remove = remove;
module.exports.insert = insert;
