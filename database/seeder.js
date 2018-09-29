const faker = require("faker");
// let HeaderDB = require("./index.js");
faker.locale = "en_US";
const fs = require("fs");
const file = fs.createWriteStream("./mockData1.json");

for (let i = 1; i <= 1000000; i++) {
  let newArtist = {
    artistID: i,
    artistName: faker.name.findName(),
    followed: Math.round(Math.random()) ? true : false,
    followersNumber: "PLACE_HOLDER",
    verified: Math.round(Math.random() * 0.7 + 0.3) ? true : false,
    artistImages: [],
    Biography: faker.lorem.paragraphs(
      faker.random.number({ min: 5, max: 10 }),
      "\n\n"
    ),
    Where: {}
  };
  // adding cities
  for (let i = 0; i < faker.random.number({ min: 20, max: 100 }); i++) {
    newArtist.Where[faker.address.city()] = faker.random.number({
      min: 10000,
      max: 1000000
    });
  }

  // adding urls to s3;
  for (let i = 1; i <= faker.random.number({ min: 2, max: 10 }); i++) {
    var num = faker.random.number({ min: 1, max: 27 });
    newArtist.artistImages.push(
      `https://s3-us-west-1.amazonaws.com/spotifyheaderchii/converted/artist${num}.webp`
    );
  }

  newArtist.followersNumber = Object.values(newArtist.Where).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
  // create new artists
  // HeaderDB.create(newArtist, function(err, newData) {
  //   err ? console.error(error) : console.log(newData);
  // });

  // write artist json
  file.write(JSON.stringify(newArtist, null, 2));

  //write artist csv
  // file.write(
  //   `${newArtist.artistID},${newArtist.artistName},${newArtist.followed},${
  //     newArtist.followersNumber
  //   },${newArtist.verified},${JSON.stringify(newArtist.artistImages)},${
  //     newArtist.Biography
  //   },${JSON.stringify(newArtist.Where)}`
  // );
}
file.end();
file.on("finish", () => {
  console.log("------finished-------");
});
