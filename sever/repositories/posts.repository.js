const { Post, Like } = require();

class PostsRepositroy {
    createPost = async (secretKey, title, content, nickname, userId) => {
        await Post.create({
            secretKey,
            title,
            content,
            nickname,
            userId,
        });
    };
}

module.exports = PostsRepositroy;
