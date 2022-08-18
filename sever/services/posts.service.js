const PostsRepositroy = require("../repositories/posts.repository");
const bcrypt = require("bcrypt");

class PostsService {
    postsRepositroy = new PostsRepositroy();

    findAllPost = async () => {
        const allPost = await this.postsRepositroy.findAllPost();
        const { allPostData, findAllPostLike } = allPost;

        return allPostData
            .map((curV, index) => {
                return {
                    postId: curV.postId,
                    title: curV.title,
                    nickname: curV.nickname,
                    createdAt: curV.createdAt,
                    like: findAllPostLike[index],
                };
            })
            .sort((a, b) => {
                return b.createdAt - a.createdAt;
            });
    };

    createPost = async (title, content, nickname, userId) => {
        await this.postsRepositroy.createPost(title, content, nickname, userId);
    };

    updatePost = async (title, newContent, postId) => {
        await this.postsRepositroy.updatePost(title, newContent, postId);
    };

    deletePost = async (postId) => {
        await this.postsRepositroy.deletePost(postId);
    };
    findOnePost = async (postId) => {
        const post = await this.postsRepositroy.findOnePost(postId);
        const { postData, myPostLike } = post;

        return {
            postId: postData.postId,
            nickname: postData.nickname,
            title: postData.title,
            content: postData.content,
            like: myPostLike.length,
            createdAt: postData.createdAt,
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
                return b.like - a.like;
            });
    };
}

module.exports = PostsService;
