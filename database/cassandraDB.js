const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1:9042"],
  keyspace: "spotify"
});

const find = callback => {
  client
    .execute(`SELECT * from artist`)
    .then(results => callback(null, results.rows))
    .catch(err => callback(err, null));
};

module.exports.find = find;
