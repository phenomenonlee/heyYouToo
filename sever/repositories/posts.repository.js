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

    // postId로 현재 게시글을 조회하고, title과 newcontent로 DB를 업데이트 해줌
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
        // 받은 인자값을 기준으로 모든 데이터 베이스 모델에 접근해서 현재 게시글에 관련된
        // 모든 데이터를 지움
        // 아직 일대다 설정과 외래키 설정에 미숙해서 수동으로 삭제를 해주고 있음
        await Post.destroy({
            where: { postId },
        });
        await Comment.destroy({ where: { postId } });

        await Like.destroy({ where: { postId } });
    };

    findOnePost = async (postId) => {
        // 받은 postId로 해당 게시글을 조회
        // Like 모델에서 postId를 가지고 현재 게시글에 좋아요가 얼마나 달려있는지를 myPostLike에 저장함
        const postData = await Post.findOne({ where: { postId } });
        const myPostLike = await Like.findAll({ where: { postId } });

        // 두 변수를 리턴해줌
        return { postData, myPostLike };
    };

    // 라이크 좋아요 부분
    exsisLike = async (postId, userId) => {
        // 인자로 받은 postId와 userId 두개를 같이 가지고 있는 데이터를 Like 모델에서 찾음
        const exsisLike = await Like.findOne({ where: { postId, userId } });
        // 찾아온 값이 있으면 값을 보낼 것이고, 없으면 아무것도 보내지 않을 것
        return exsisLike;
    };

    postLike = async (postId, userId) => {
        // 현재 게시글 postId와  현재 유저의 userId를 Like 모델에서 생성해줌
        await Like.create({ postId, userId });
    };

    // 라이크 취소 부분
    postUnlike = async (postId, userId) => {
        // 현재 게시글 postId와  현재 유저의 userId를 Like 모델에서 삭제해줌
        await Like.destroy({ where: { postId, userId } });
    };

    getMyPost = async (userId) => {
        // 좋아요 갯수 저장할 빈 array
        let myPostsLike = [];

        // 받은 userId로 내가 올린 게시글 조회
        const myPostData = await Post.findAll({ where: { userId } });

        // myPostData의 length 만큼 반복문을 돌려서 각 게시글에 postId를 받음
        // 그 다음 Like 모델에서 내가 올린 게시글(myPostData)을 반복문을 돌려서 각 게시글에 postId를 가지고
        // 각 게시글이 좋아요가 얼마나 되어있는지 length를 받아서 myPostsLike 배열에 push 해줌
        for (let i = 0; i < myPostData.length; i++) {
            const myPostsLikeLength = await Like.findAll({
                where: { postId: myPostData[i].postId },
            });
            myPostsLike.push(myPostsLikeLength.length);
        }

        // myPostData, myPostsLikeLength를 리턴해줌

        return { myPostData, myPostsLike };
    };
}

module.exports = PostsRepositroy;
