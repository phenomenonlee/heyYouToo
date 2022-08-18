const { Post, Like, Comment } = require("../../models");

class PostsRepositroy {
    //  allPostData에서 모든 게시글 데이터를 가지고 옴
    /* 
    반복문은 현재 게시글의 개수만큼 돌리고 Like 데이터베이스 모델에서
    where를 보면 
      */

    findAllPost = async () => {
        let findAllPostLike = [];

        const allPostData = await Post.findAll();

        for (let i = 0; i < allPostData.length; i++) {
            let allPostLike = await Like.findAll({
                where: { postId: allPostData[i].postId },
            });
            findAllPostLike.push(allPostLike.length);
        }

        return { allPostData, findAllPostLike };
    };

    createPost = async (title, content, nickname, userId) => {
        await Post.create({
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
        await Comment.destroy({ where: { postId } });

        await Like.destroy({ where: { postId } });
    };

    findOnePost = async (postId) => {
        const postData = await Post.findOne({ where: { postId } });
        const myPostLike = await Like.findAll({ where: { postId } });

        return { postData, myPostLike };
    };

    // 라이크 좋아요 부분
    exsisLike = async (postId, userId) => {
        const exsisLike = await Like.findOne({ where: { postId, userId } });
        return exsisLike;
    };

    postLike = async (postId, userId) => {
        await Like.create({ postId, userId });
    };
    // 라이크 취소 부분
    postUnlike = async (postId, userId) => {
        await Like.destroy({ where: { postId, userId } });
    };

    getMyPost = async (userId) => {
        let myPostsLike = [];

        // 내가 올린 게시글 찾기
        const myPostData = await Post.findAll({ where: { userId } });

        // 내가 올린 게시글 좋아요 개수
        for (let i = 0; i < myPostData.length; i++) {
            const myPostsLikeLength = await Like.findAll({
                where: { postId: myPostData[i].postId },
            });
            myPostsLike.push(myPostsLikeLength.length);
        }
        return { myPostData, myPostsLike };
    };
}

module.exports = PostsRepositroy;
