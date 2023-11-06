const { Comment } = require('../models');

const commentData = [{
        comment_text: "Hello, I am commenting.",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "This is another comment.",
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: "Be not afraid.",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;