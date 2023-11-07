const { Post } = require('../models');

const postData = [
    {
        title: "How I Made A Post",
        content: "I wrote some stuff down once and it was great.",
        user_id: 1

    },
    {
        title: "We Are Doing It",
        content: "Magnificent, it is all coming together now.",
        user_id: 2
    },
    {
        title: "Writing Good Code",
        content: "I am still learning... :(",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;