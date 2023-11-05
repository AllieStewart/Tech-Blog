// Start of JS file
// Index file to require files.
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User.hasMany(Project, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Project.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// User has many Post, Comment
// Post has many Comment
// Comment belongs to User, Post
// Post belongs to User

module.exports = { User, Post, Comment };
// ^Placeholder from mini-project
// End of JS file