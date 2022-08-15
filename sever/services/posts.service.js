const PostsRepositroy = require("../repositories/posts.repository");
const bcrypt = require("bcrypt");
const { post } = require("../routes/posts.routes");

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
    findOnePost = async (postId) => {
        const post = await this.postsRepositroy.findOnePost(postId);
        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            like: null,
            createdAt: post.createdAt,
        };
    };
    postLike = async (postId, userId) => {
        const exsisLike = await this.postsRepositroy.exsisLike(postId, userId);

        if (exsisLike) {
            return false;
        } else {
            await this.postsRepositroy.postLike(postId, userId);
            return true;
        }
    };

    postUnlike = async (postId, userId) => {
        const exsisLike = await this.postsRepositroy.exsisLike(postId, userId);

        if (exsisLike) {
            await this.postsRepositroy.postUnlike(postId, userId);
            return true;
        } else {
            return false;
        }
    };

    getMyPost = async (userId) => {
        const myPost = await this.postsRepositroy.getMyPost(userId);

        const { myPostData, myPostsLike } = myPost;

        return myPostData
            .map((post, index) => {
                return {
                    postId: post.postId,
                    title: post.title,
                    like: myPostsLike[index],
                    createdAt: post.createdAt,
                };
            })
            .sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
    };
}

module.exports = PostsService;
