const PostsRepositroy = require("../repositories/posts.repository");
const bcrypt = require("bcrypt");

class PostsService {
    postsRepositroy = new PostsRepositroy();

    // 서비스 계층에서 repository 계층에서 받아온 모든 게시글 데이터를 가공함
    findAllPost = async () => {
        const allPost = await this.postsRepositroy.findAllPost();

        //repository에서 return 값을 객체분해할당으로 받음
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
