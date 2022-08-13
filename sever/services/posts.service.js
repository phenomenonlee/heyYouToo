const PostsRepositroy = require("../repositories/posts.repository");

class PostsService {
    postsRepositroy = new PostsRepositroy();

    createPost = async (secretKey, title, content, nickname, userId) => {
        await this.postsRepositroy.createPost(
            secretKey,
            title,
            content,
            nickname,
            userId
        );
    };
}

module.exports = PostsService;
