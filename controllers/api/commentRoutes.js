// Start of JS file
// CommentRoutes for GET, POST, PUT, DELETE of comments.
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all comments
router.get('/', async (req, res) => {
    await Comment.findAll({})
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET comments by id
router.get('/:id', async (req, res) => {
    await Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// CREATE new comment
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        await Comment.create({
                text: req.body.text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            .then(commentData => res.json(commentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
});

// UPDATE comment by id
router.put('/:id', withAuth, async (req, res) => {
    await Comment.update({
        text: req.body.text
    }, {
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }
        res.json(commentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE comment by id
router.delete('/:id', withAuth, async (req, res) => {
    await Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }
        res.json(commentData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
// End of JS file