// Start of JS file
// Index to seed the database,
// takes seed data from other files in /seeds.
const sequelize = require('../config/connection');

const seedUsers = require('./userData.js');
const seedPosts = require('./postData.js');
const seedComments = require('./commentData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedDatabase();
// End of JS file