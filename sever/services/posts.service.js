const PostsRepositroy = require("../repositories/posts.repository");
const bcrypt = require("bcrypt");

class PostsService {
    postsRepositroy = new PostsRepositroy();

    findAllPost = async () => {
        const allPost = await this.postsRepositroy.findAllPost();

        return allPost
            .map((curV) => {
                return {
                    postId: curV.postId,
                    title: curV.title,
                    nickname: curV.nickname,
                    createdAt: curV.createdAt,
                    like: null,
                };
            })
            .sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
    };

    createPost = async (secretKey, title, content, nickname, userId) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(secretKey, salt);

        await this.postsRepositroy.createPost(
            hashpassword,
            title,
            content,
            nickname,
            userId
        );
    };

    updatePost = async (title, newContent, postId) => {
        await this.postsRepositroy.updatePost(title, newContent, postId);
    };

    deletePost = async (postId) => {
        await this.postsRepositroy.deletePost(postId);
    };
}

module.exports = PostsService;
