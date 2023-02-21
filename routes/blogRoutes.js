const express = require('express');
const router = express.Router();
const {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
} = require('../controllers/blogController');

// * fetch and render all blogs on the home page
router.get('/', (req, res) => blog_index(req, res));

// * save new blog to db
router.post('/', (req, res) => {
  blog_create_post(req, res);
});

// * fetch the form for creating  a new blog
router.get('/create', (req, res) => {
  blog_create_get(req, res);
});

// * render and redirect to a specific blog page
router.get('/:id', (req, res) => {
  blog_details(req, res);
});

// * delete a blog by id
router.delete('/:id', (req, res) => {
  blog_delete(req, res);
});

module.exports = router;
