const PostsRepositroy = require("../repositories/posts.repository");
const bcrypt = require("bcrypt");

class PostsService {
    postsRepositroy = new PostsRepositroy();

    // 서비스 계층에서 repository 계층에서 받아온 모든 게시글 데이터를 가공함
    findAllPost = async () => {
        const allPost = await this.postsRepositroy.findAllPost();


        //repository에서 return 값을 구조분해할당으로 받음

        // allpostData는 모든 게시글의 데이터를 배열 형태로 가지고 옴
        // findAllpostLikk는 게시글마다 가지고 있는 좋아요 갯수를 배열 형태로 보내줌
        const { allPostData, findAllPostLike } = allPost;

        /* 
        가져온 모든 게시글을 map 함수로 돌려서 리턴 해주며, like 항목은 
        findAllpostLike에서 가지고 와서 현재 게시글의 인덱스 값을 키 값으로 넣어줌 
        그리고 sort를 사용해서 게시글을 최신순으로 정렬해준다.
        */
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
        // 받은 인자 값을 데이터베이스 계층으로 보내줌
        await this.postsRepositroy.createPost(title, content, nickname, userId);
    };

    updatePost = async (title, newContent, postId) => {
        // 받은 인자를 데이터베이스 계층으로 보내줌
        await this.postsRepositroy.updatePost(title, newContent, postId);
    };

    deletePost = async (postId) => {
        // 받은 인자를 데이터베이스 계층으로 보내줌
        await this.postsRepositroy.deletePost(postId);
    };

    findOnePost = async (postId) => {
        // 받은 postId를 데이터베이스 계층에 보내주고 구조분해 할당으로 값을 리턴 받음
        const post = await this.postsRepositroy.findOnePost(postId);

        // 구조 분해 할당으로 받은 데이터들을 가공해서 리턴 값으로 보내줌
        const { postData, myPostLike } = post;
        return {
            postId: postData.postId,
            nickname: postData.nickname,
            title: postData.title,
            content: postData.content,
            // mypostLike는 좋아요 된 게시글 데이터를 가지고 오기 때문에 length를 붙여서 좋아룔 갯수를 반환
            like: myPostLike.length,
            createdAt: postData.createdAt,
        };
    };

    postLike = async (postId, userId) => {
        // 로그인 유저가 현재 게시물에 좋아요 했는지 안했는지 검증
        const exsisLike = await this.postsRepositroy.exsisLike(postId, userId);

        // exsisLike가 존재하면 이미 좋아요를 한 것이기 때문에 false를 리턴
        if (exsisLike) {
            return false;
        } else {
            // exsisLike가 존재하지 않으면 좋아요를 한 적이 없기 때문에 데이터베이스 계층에
            // postId와 userId를 보내줘서 좋아요 생성
            await this.postsRepositroy.postLike(postId, userId);
            // true를 리턴
            return true;
        }
    };

    postUnlike = async (postId, userId) => {
        // 로그인 유저가 현재 게시물에 좋아요 했는지 안했는지 검증
        const exsisLike = await this.postsRepositroy.exsisLike(postId, userId);

        if (exsisLike) {
            // 만약 exsisLike가 존재하면 취소할 종아요 있다는 것이기 때문에 데이터 베이스 계층에 인자를 보내줌
            await this.postsRepositroy.postUnlike(postId, userId);
            // 그리고 true를 반환
            return true;
        } else {
            // else 부분에 오게 된다면 삭제할 좋아요가 없다는 것이기 때문에 false를 반환
            return false;
        }
    };

    getMyPost = async (userId) => {
        // 데이터베이스 계층에 userId를 보내줌
        const myPost = await this.postsRepositroy.getMyPost(userId);

        // 구조분해 할당으로 myPostd의 리턴 값을 받음
        const { myPostData, myPostsLike } = myPost;

        // myPostData는 배열로 내가 올린 게시글의 정보들이 있음
        // myPostsLike는 배열로 내가 올린 게시글에 좋아요 갯수를 가지고 있음

        // 두배열의 길이는 같음

        // 값을 가공해서 리턴해줌
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
