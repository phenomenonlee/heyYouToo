const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
    commentsRepository = new CommentsRepository();

    //댓글 조회
    /* findAllcomment로 postId를 보내서 repository에서 allComment 데이터를 받아온 뒤 reverse()로 최신순으로 정렬한다 */
    findAllcomment = async (postId) => {
        const allComment = await this
            .commentsRepository
            .findAllcomment(postId);
        return allComment.reverse();
    }
    //댓글 작성
    createComment = async (userId, postId, comment) => {
        const createCommentData = await this
            .commentsRepository
            .createComment(userId, postId, comment,);
        return createCommentData
    };
    //댓글 수정
    updateComment = async (userId, commentId, newComment) => {
        const findComment = await this
            .commentsRepository
            .updateComment(userId, commentId, newComment);
        return findComment;

    }
    //댓글 삭제
    deleteComment = async (commentId, password, userId) => {
        const deleteComment = await this
            .commentsRepository
            .deleteComment(commentId, password, userId);
        return deleteComment
    }
}

module.exports = CommentsService;
