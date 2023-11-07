// Start of JS file
// PostRoutes for GET, POST, PUT, DELETE of posts.
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
router.get('/', async (req, res) => {
    console.log('======================');
    await Post.findAll({
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(postData => res.json(postData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// GET post by id
router.get('/:id', async (req, res) => {
    await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id.' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE new post
router.post('/', withAuth, async (req, res) => {
    await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE post by id
router.put('/:id', withAuth, async (req, res) => {
    await Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id.' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE post by id
router.delete('/:id', withAuth, async (req, res) => {
    await Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(postData => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id.' });
            return;
        }
        res.json(postData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
// End of JS file