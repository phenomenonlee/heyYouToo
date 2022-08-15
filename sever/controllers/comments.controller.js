const CommentsService = require("../services/comments.service");

class CommentsController {
    commentsService = new CommentsService();

    //댓글 조회
    getComments = async (req, res, next) => {
        const {postId} = req.params;
        const comments = await this
            .commentsService
            .findAllcomment(postId);

        if (comments.length === 0) {
            res
                .status(404)
                .json({errorMessage: '댓글이 존재하지 않습니다.'})
            return;
        };

        res
            .status(200)
            .json({data: comments});
    };

    //댓글 작성
    createComment = async (req, res, next) => {
        const {postId} = req.params;
        const {comment} = req.body;
        const userId = 10;
/*         const { userId } = res.locals; 
        console.log(res.locals) */

        if (!comment) {
            res
                .status(404)
                .json({errorMessage: '데이터 형식을 확인해주세요.'})
            return;
        };

        try {
            const createCommentData = await this
                .commentsService
                .createComment(userId, postId, comment,);
            res
                .status(201)
                .json();
        } catch (error) {
            res
                .status(400)
                .json({errorMessage: 'error'})
        }
    };

    //댓글 수정
    updateComment = async (req, res, next) => {
        const {commentId} = req.params;
        const {newComment} = req.body;
        const userId = 10;

        if (!newComment) {
            res
                .status(404)
                .json({errorMessage: '데이터 형식을 확인해주세요.'});
            return;
        };

        const updateComment = await this
            .commentsService
            .updateComment(userId, commentId, newComment,)

        if (updateComment.errorMessage) {
            res
                .status(400)
                .json({errormessage: updateComment.errorMessage});
        } else {
            res
                .status(200)
                .json("댓글 수정완료");
        }

    };

    //댓글 삭제
    deleteComment = async (req, res, next) => {
        const {commentId} = req.params;
        const {password} = req.body;
        //const { userId } = res.locals;
        const userId = 10;

        if (!password) {
            res
                .status(404)
                .json({errorMessage: '비밀번호를 입력해주세요.'});
            return;
        };

        const deleteComment = await this
            .commentsService
            .deleteComment(commentId, password, userId);

        if (deleteComment.errorMessage) {
            res
                .status(400)
                .json({errormessage: deleteComment.errorMessage});
        } else {
            res
                .status(200)
                .json("댓글 삭제완료");
        }

    }
}

module.exports = CommentsController;
