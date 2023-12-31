// Start of JS file
// Home page routes.
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');

// GET all posts -> homepage
router.get('/', async (req, res) => {
    await Post.findAll({
          attributes: [
              'id',
              'title',
              'content',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          const posts = postData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET login -> login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

// GET signup -> signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET post id -> single-post page
router.get('/post/:id', async (req, res) => {
    await Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          if (!postData) {
              res.status(404).json({ message: 'No post found with this id.' });
              return;
          }
          const post = postData.get({ plain: true });
          console.log(post);
          res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET posts comments -> post-comments page
router.get('/posts-comments', async (req, res) => {
    await Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'content',
              'title',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          if (!postData) {
              res.status(404).json({ message: 'No post found with this id.' });
              return;
          }
          const post = postData.get({ plain: true });
          res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
// End of JS file