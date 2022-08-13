const { Post } = require("../../models");

class PostsRepositroy {
    findAllPost = async () => {
        const allPost = await Post.findAll();

        return allPost;
    };

    createPost = async (hashpassword, title, content, nickname, userId) => {
        await Post.create({
            secretkey: hashpassword,
            title,
            content,
            nickname,
            userId,
        });
    };

    updatePost = async (title, newContent, postId) => {
        await Post.update(
            {
                title,
                content: newContent,
            },
            {
                where: { postId },
            }
        );
    };

    deletePost = async (postId) => {
        await Post.destroy({
            where: { postId },
        });
    };
}

module.exports = PostsRepositroy;
