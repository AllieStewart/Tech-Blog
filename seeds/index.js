// Start of JS file
// Index to seed the database,
// takes seed data from other files in /seeds.
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.js');
const postData = require('./postData.js');
const commentData = require('./commentData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  await commentData();

  process.exit(0);
};

seedDatabase();

// End of JS file