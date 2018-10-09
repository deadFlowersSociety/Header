const Sequelize = require("sequelize");
const sequelize = new Sequelize("spotify", "", "", {
  logging: false,
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false
  // pool: {
  // max: 90,
  // min: 0,
  // acquire: 30000,
  // idle: 3000
  // }
});

const Artist = sequelize.define(
  "artist",
  {
    artistID: { type: Sequelize.INTEGER, primaryKey: true },
    artistName: Sequelize.TEXT,
    followed: Sequelize.BOOLEAN,
    followersNumber: Sequelize.INTEGER,
    verified: Sequelize.BOOLEAN,
    artistImages: Sequelize.ARRAY(Sequelize.TEXT),
    Biography: Sequelize.TEXT,
    Where: Sequelize.JSON
  },
  { createdAt: false, updatedAt: false }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// let mock = {
//   artistID: 4,
//   artistName: "somename",
//   followed: true,
//   followersNumber: 235466,
//   verified: false,
//   artistImages: ["asdfsdf", "sdfsfasdfasf"],
//   Biography:
//     "Enim laudantium sed occaecati laudantium aut debitis beatae recusandae. Commodi similique qui. Iste animi et.\n\nSuscipit recusandae porro illum consequatur nam quia. Error rerum eligendi eos voluptas maiores. Eos rerum maxime dolorem. Aut aut quod dolores animi quia voluptatem adipisci rerum. Sed unde consectetur corrupti et architecto voluptas autem aut id.\n\nUt dolor itaque minima et pariatur itaque. Provident aspernatur molestiae vero nihil et provident dignissimos illum. Fuga aspernatur doloremque.\n\nEt perspiciatis perferendis praesentium. Voluptas sapiente tenetur repellat ea enim incidunt voluptas eaque ipsum. Vel eaque est est distinctio delectus delectus omnis et.\n\nFacere assumenda inventore amet quibusdam distinctio vel commodi aut. Earum maxime alias et sed veritatis deleniti. Sunt impedit reiciendis enim ea magnam reprehenderit. Tempore aut illo a aliquam. Est laudantium magni vel asperiores ipsa fuga velit quod provident.",
//   Where: { place1: 34234, place2: 34536 }
// };
// Artist.sync().then(() => {
//   Artist.create(mock).then(() => console.log("inserted"));
// });

Artist.sync();

const insert = (artistObj, callback) => {
  Artist.create(artistObj)
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err, null);
    });
};

const update = (id, body, callback) => {
  Artist.update(body, { where: { artistID: id } })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err, null);
    });
};
const remove = (id, callback) => {
  Artist.destroy({ where: { artistID: id } })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err, null);
    });
};
const find = (id, callback) => {
  Artist.findById(id, { raw: true })
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      callback(err, null);
    });
};

module.exports.find = find;
module.exports.update = update;
module.exports.remove = remove;
module.exports.insert = insert;
