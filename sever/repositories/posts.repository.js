const { Post, Like, Comment } = require("../../models");

class PostsRepositroy {
    //  allPostData에서 모든 게시글 데이터를 가지고 옴

    findAllPost = async () => {
        let findAllPostLike = [];

        const allPostData = await Post.findAll();

        /* 반복문은 현재 게시글의 개수만큼 돌리고 Like 데이터베이스 모델에서
    where에서 postId에 반복문을 돌리면서 현재 postId를 넣어서 찾고
    그 찾은 값에 길이가 좋아요 갯수이기 때문에 findAllpostLike에 
    값을 push해준다. 그리고 return으로 allPostData와 findAllpostLike를
    보내준다.*/

        for (let i = 0; i < allPostData.length; i++) {
            let allPostLike = await Like.findAll({
                where: { postId: allPostData[i].postId },
            });
            findAllPostLike.push(allPostLike.length);
        }

        return { allPostData, findAllPostLike };
    };

    createPost = async (title, content, nickname, userId) => {
        // 받은 인자값을 데이터베이스에 추가
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
