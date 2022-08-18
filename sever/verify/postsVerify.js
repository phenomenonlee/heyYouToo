const { Post, User } = require("../../models");
const bcrypt = require("bcrypt");

class PostVerify {
    /*
    title과 content를 받아서 둘 중에 하나라도 빈 값이면 
    false를 리턴하고 아니면 true를 리턴
     */
    veerifyBody = (title, content) => {
        if (title && content) {
            return true;
        } else {
            return false;
        }
    };

    //title과 newcontent가 빈값이면 fals를 반환 아니면 true를 반환
    exsistContentAndTitle = (title, newContent) => {
        if (title && newContent) {
            return true;
        } else {
            return false;
        }
    };

    // postId와 userId를 받는다.
    // 현재 postId는 현재 조회하고 있는 게시글이다.
    //현재 조회하고 있는 게시글에 저장된 userId와 즉 postUserInfo.userId와 인자 값으로 받은 userId(현재 유저)를 검증함
    // 조건문이 같으면 게시글을 단 유저와 현재 유저가 같은 것이기 때문에 true를 리턴 아니면 false를 리턴
    veerifyPost = async (userId, postId) => {
        const PostUserInfo = await Post.findOne({ where: { postId } });
        if (PostUserInfo.userId === userId) {
            return true;
        } else {
            return false;
        }
    };

    // 유저의 password를 검증하는 부분
    verifyPassword = async (userId, password) => {
        // 받은 인자값 userId로 현재 유저 정보를 UserInfo에 저장
        const UserInfo = await User.findOne({ where: { userId } });

        // 바디 값으로 받은 password와 현재 유저정보에 있는 password를 비교 함
        // validPassword는 비교가 성공하면 true 아니면 false를 반환 함
        const validPassword = await bcrypt.compare(password, UserInfo.password);

        return validPassword;
    };

    // postId를 인자로 받고 데이터베이스에 조회를 해서 있으면 true 없으면 false를 반환 해줌
    exsisPost = async (postId) => {
        const exsisPost = await Post.findOne({ where: { postId } });
        if (exsisPost) {
            return true;
        } else {
            return false;
        }
    };

    verifysecretKey = async (secretKey, postId) => {
        const hashpassword = await Post.findOne({ where: { postId } });
        if (!secretKey) {
            return false;
        }
        const validPassword = await bcrypt.compare(
            secretKey,
            hashpassword.secretkey
        );
        return validPassword;
    };
}

module.exports = PostVerify;
