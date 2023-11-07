// Start of JS file
// Index to seed the database,
// takes seed data from other files in /seeds.
const seedUsers = require('./userData.js');
const seedPosts = require('./postData.js');
const seedComments = require('./commentData.js');

const sequelize = require('../config/connection');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  console.log("---USERS SEEDED---");

  await seedPosts();
  console.log("---POSTS SEEDED---");

  await seedComments();
  console.log("---COMMENTS SEEDED---");

  process.exit(0);
};

seedDatabase();
// End of JS file