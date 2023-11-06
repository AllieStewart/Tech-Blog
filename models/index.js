// Start of JS file
// Index file to require files.
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User has many Post, Comment
// Post has many Comment
// Comment belongs to User, Post
// Post belongs to User

User.hasMany(Post, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

module.exports = { User, Post, Comment };
// End of JS file