const { Comment, User } = require("../../models");
const bcrypt = require("bcrypt");

class CommentsRepository {
    //댓글 조회
    /* 받아온 postId를 가지고 있는 모든 comments를 Comment에서 찾아서 리턴한다. */
    findAllcomment = async (postId) => {
        const comments = await Comment.findAll({ where: { postId } });
        return comments;
    };

    //댓글 작성
    /* userId로 User에서 userInfo를 찾아서 nickname을 찾아 댓글 데이터를 저장한 뒤 createCommentData를 리턴한다. */
    createComment = async (userId, postId, comment) => {
        const userInfo = await User.findOne({ raw: true, where: { userId } });
        const createCommentData = await Comment.create({
            postId,
            userId,
            nickname: userInfo.nickname,
            comment,
        });
        return createCommentData;
    };
    //댓글 수정
    /* commentId를 이용해 수정할 댓글을 찾고, userId로 userInfo를 찾아서
    해당 게시글을 수정한다. */
    updateComment = async (userId, commentId, newComment) => {
        const comment = await Comment.findByPk(commentId);
        const userInfo = await User.findByPk(userId);

        if (!comment) {
            return { errorMessage: "댓글이 존재하지 않습니다." };
        }

        //댓글을 수정하려고 하는 유저의 uerId와 해당 댓글을 작성한 userId가 일치하지 않을 경우 수정이 불가능하다.
        if (userInfo.userId !== comment.userId) {
            return { errorMessage: "사용자가 작성한 댓글이 아닙니다." };
        }

        //해당 commentId를 가지고 있는 comment에 받아온 newComment를 comment에 저장하여 리턴한다.
        if (comment) {
            await Comment.update(
                { comment: newComment },
                { where: { commentId: comment.commentId } }
            );
            return true;
        }
    };

    //댓글 삭제
    /* 받아온 commentId로 삭제할 댓글을 찾고, userId로 userInfo를 찾아서
    댓글을 작성한 사용자가 댓글을 삭제하려는 사용자와 일치하는지 확인한다. */
    deleteComment = async (commentId, password, userId) => {
        const comment = await Comment.findByPk(commentId);
        const userInfo = await User.findOne({ raw: true, where: { userId } });

        if (!comment) {
            return { errorMessage: "댓글이 존재하지 않습니다." };
        }

        if (userInfo.userId !== comment.userId) {
            return { errorMessage: "댓글을 작성한 사용자가 아닙니다." };
        }

        //댓글 삭제시 입력한 비밀번호와 로그인 비밀번호를 확인한다.
        const hashpassword = await User.findOne({ where: { userId } });
        const validPassword = await bcrypt.compare(
            password,
            hashpassword.password
        );
        //validPassword는 true or false로 나오기 때문에 false일 경우 errorMessage를 리턴한다.
        if (!validPassword) {
            return { errorMessage: "비밀번호가 다릅니다." };
        }
        //삭제하려는 댓글이 있으면 commentId에 해당하는 댓글을 삭제한다.
        if (comment) {
            await Comment.destroy({ where: { commentId: comment.commentId } });
            /* const user = await User.findByPk(userId);
            return user; */
        }
    };
}

module.exports = CommentsRepository;
