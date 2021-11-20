const Post = require("../models/Forum.js");
const { mongooseToObject } = require("../util/mongoose.js");

class forumController {

    // [GET] /api/forum/create
    create(req, res, next) {
        res.render('courses/create');
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
            .then(() => res.redirect("/api/forum/create"))
            .catch((error) => {});
    }

    // [GET] /api/forum/post/:id/edit
    edit(req, res, next) {
        Post.findById(req.params.id)
            .then((post) =>
                res.render('courses/edit', {
                    post: mongooseToObject(post),
                }),
            )
            .catch(next);
    }

    // [GET] /api/forum/post/:id/
    showPost(req, res, next) {
        Post.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    // [PUT] /api/forum/post/:id/update
    update(req, res, next) {
        Post.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/api/forum/create'))
            .catch(next);
    }

    // [GET] /api/forum/post/:id/
    commentForm(req, res, next) {
        Post.findById(req.params.id)
            .then((post) =>
                res.render('courses/comment', {
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
        });
        res.redirect('back');
    }

}

module.exports = new forumController();
