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

    veerifyUpdate = (title, newContent) => {
        if (title && newContent) {
            return true;
        } else {
            return false;
        }
    };

    veerifyPost = async (userId, postId) => {
        const PostUserInfo = await Post.findOne({ where: { postId } });
        if (PostUserInfo.userId === userId) {
            return true;
        } else {
            return false;
        }
    };

    verifyPassword = async (userId, password) => {
        const UserInfo = await User.findOne({ where: { userId } });

        const validPassword = await bcrypt.compare(password, UserInfo.password);

        return validPassword;
    };
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
