const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

// Load Post Schema
const Post = require("../../models/Post");
// Load Profile Schema
const Profile = require("../../models/Profile");

// Load Validation
const validatePostInput = require("../../Validations/post");

// @route    GET api/posts/test
// @desc     Test posts route
// @access    Public
router.get("/test", (req, res) =>
  res.json({
    msg: "/api/posts/test"
  })
);

// @route    GET api/posts/test
// @desc     Get all posts
// @access    Public
router.get("/", (req, res) =>
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No Posts found" }))
);

// @route    GET api/posts/test
// @desc     Get all posts
// @access    Public
router.get("/:id", (req, res) =>
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No Post found by this ID" })
    )
);

// @route    POST api/posts
// @desc     Create Post
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check for errors
    if (!isValid) {
      // If any errors, send 400 with the errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => res.json(err));
  }
);

// @route    Delete api/posts/:id
// @desc     Delete Post
// @access    Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route    POST api/posts/like/:id
// @desc     Like Post
// @access    Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "User already liked this post" });
        }

        // Add user to likes
        post.likes.unshift({ user: req.user.id });

        // Save
        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route    POST api/posts/unlike/:id
// @desc     Unlike Post
// @access    Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You haven't liked the post yet" });
        }

        // Find the index of the like
        const removeIndex = post.likes
          .map(like => like.user.toString())
          .indexOf(req.user.id);

        //Remove Like
        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route    POST api/posts/comment/:id
// @desc     Add comment
// @access    Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check for errors
    if (!isValid) {
      // If any errors, send 400 with the errors object
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add comment to the post
        post.comments.unshift(newComment);

        // Save
        post
          .save()
          .then(post => res.json(post))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access    Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Find the index of the like
        const removeIndex = post.comments
          .map(comment => comment._id.toString())
          .indexOf(req.params.comment_id);

        //Remove Like
        post.comments.splice(removeIndex, 1);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
