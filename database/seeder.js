const faker = require('faker');
let HeaderDB = require('./index.js');

for (let i = 1; i <= 100; i++) {
  let newArtist = {
    artistID: i,
    artistName: faker.name.findName(),
    followersNumber: Math.floor(Math.random() * 10000000),
    artistImages: ['https://loremflickr.com/320/240', 'https://loremflickr.com/320/240', 'https://loremflickr.com/320/240', 'https://loremflickr.com/320/240'],
    about: {
      Biography: faker.lorem.paragraphs(),
      Where: {
        [faker.address.city()]: Math.floor(Math.random() * 1000000),
        [faker.address.city()]: Math.floor(Math.random() * 1000000),
        [faker.address.city()]: Math.floor(Math.random() * 1000000),
        [faker.address.city()]: Math.floor(Math.random() * 1000000),
        [faker.address.city()]: Math.floor(Math.random() * 1000000)
      }
    }
  };
  HeaderDB.create(newArtist, function(err, newData) {
    err ? console.error(error) : console.log(newData);
  });
}