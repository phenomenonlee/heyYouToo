const PostsService = require("../services/posts.service");

class PostsController {
    postsService = new PostsService();
}

module.exports = PostsController;
