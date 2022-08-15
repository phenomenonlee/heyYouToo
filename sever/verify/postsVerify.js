const { Post, User } = require("../../models");
const bcrypt = require("bcrypt");

class PostVerify {
    veerifyBody = (secretKey, title, content) => {
        if (secretKey && title && content) {
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
        if (UserInfo.password === password) {
            return true;
        } else {
            return false;
        }
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
        const validPassword = await bcrypt.compare(
            secretKey,
            hashpassword.secretkey
        );
        return validPassword;
    };
}

module.exports = PostVerify;
