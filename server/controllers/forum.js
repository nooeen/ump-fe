const Post = require("../models/Forum.js");
const { mongooseToObject, mutipleMongooseToObject } = require("../util/mongoose.js");

class forumController {

    // [GET] /api/forum/create
    create(req, res, next) {
        res.json("Form");
    }


    // [POST] /api/forum/store
    store(req, res ) {
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
                }),
            )
            .catch(next);
    }

    // [PUT] /api/forum/post/:id/update
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.json(req.body))
            .catch(next);
    }

    // [GET] /api/forum/post/:id/
    show(req, res, next) {
        Post.findById(req.params.id)
            .then((post) =>
                res.json({
                    post: mongooseToObject(post),
                }),
            )
            .catch(next);
    }


    // [PATCH] /api/forum/post/:id/comment
    comment(req, res, next) {
        var content = req.body;
        content.created_at = Date.now();
        console.log(req.params.id);
        console.log(content);
        Post.findOneAndUpdate(
            { _id: req.params.id }, 
            { $push: { contents: content } },
            function (error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(success);
                    }
            }
        );
        res.redirect('back');
    }

    // [GET] api/forum/listPosts
    listPosts(req, res, next) {
        console.log(req.query);
        Post.find({class: req.query.class})
            .sort({ created_at: -1})
            .then((posts) =>
                res.json({ posts: mutipleMongooseToObject(posts)})
            )
            .catch(next);

    }

}

module.exports = new forumController();
