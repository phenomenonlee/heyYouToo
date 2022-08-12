const PostsRepositroy = require("../repositories/posts.repository");

class PostsService {
    postsRepositroy = new PostsRepositroy();
}

module.exports = PostsService;
