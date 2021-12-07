const Post = require("../models/Post.js");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../util/mongoose.js");

class forumController {
  // [GET] /api/forum/create
  create(req, res, next) {
    res.json("Form");
  }

  // [POST] /api/forum/store
  store(req, res) {
    const post = new Post();
    post.title = req.body.title;
    post.class = req.body.class;
    post.created_by = req.body.username;
    post.content = req.body.content;
    post
      .save()
      .then(() => res.json(post))
      .catch((error) => {});
  }

  // [GET] /api/forum/post/:id/edit
  edit(req, res, next) {
    Post.findById(req.params.id)
      .then((post) =>
        res.json({
          post: mongooseToObject(post),
        })
      )
      .catch(next);
  }

  // [PUT] /api/forum/post/:id/update
  update(req, res, next) {
    Post.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((post) => res.json({ post: mongooseToObject(post) }))
      .catch(next);
  }

  // [GET] /api/forum/post/:id/
  show(req, res, next) {
    Post.findById(req.params.id)
      .then((post) =>
        res.json({
          post: mongooseToObject(post),
        })
      )
      .catch(next);
  }

  // [PATCH] /api/forum/post/:id/comment
  comment(req, res, next) {
    var content = req.body;
    // content.created_at = Date.now();
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { contents: content } }
    )
      .then((post) => res.json({ post: mongooseToObject(post) }))
      .catch(next);
  }

  // [GET] api/forum/listPosts
  listPosts(req, res, next) {
    Post.find({ class: req.query.class })
      .sort({ created_at: -1 })
      .then((posts) => res.json({ posts: mutipleMongooseToObject(posts) }))
      .catch(next);
  }

  // [DELETE] /api/forum/post/:id/delete
  destroy(req, res, next) {
    Post.delete({ _id: req.params.id })
      .then(() => res.json("Mới giả xóa thôi, yên tâm"))
      .catch(next);
  }

  // [DELETE] /api/forum/post/:id/force
  forceDestroy(req, res, next) {
    Post.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json("Xóa thật rồi, yên tâm"))
      .catch(next);
  }

  // [PATCH] /api/forum/post/:id/restore
  restore(req, res, next) {
    Post.restore({ _id: req.params.id })
      .then(() => res.redirect(`/api/forum/post/${req.params.id}`))
      .catch(next);
  }
}

module.exports = new forumController();
