const CommentsService = require("../services/comments.service");
const jwt = require("jsonwebtoken");

class CommentsController {
    commentsService = new CommentsService();

    //댓글 조회//
    /* 클라이언트에서 받아온 postId를 findAllcomment에 담아서 service로 보내고 comments를 조회한다
    조회한 comment의 길이가 0, 즉 postId에 해당하는 댓글이 없다면 errorMessase를 보내고
    있다면 해당 댓글의 data를 response 한다. */
    getComments = async (req, res, next) => {

        //헤더에서 토큰을 받아와서 권한이 있는지 확인
        /* const { authorization } = req.headers; */
        /* const verifyComment = jwt.verify(authorization, "hohoho"); */

        const { postId } = req.params;

        //게시글의 secetkey를 모르는 유저가 댓글을 조회하는 부분을 막기 위해 작성한 부분
        //게시글 상세페이지 조회를 하면 해당 postId로 comment token을 발급해주는데 그 토큰이 있는지 확인
        /*  if (verifyComment.postId !== postId) {
            return res.status(400).json({ errorMessage: "권한이 없습니다." });
        } */

        const comments = await this.commentsService.findAllcomment(postId);

        if (comments.length === 0) {
            res.status(400).json({
                errorMessage: "댓글이 존재하지 않습니다.",
            });
            return;
        }

        res.status(200).json({ data: comments });
    };

    //댓글 작성
    /* postId, comment를 받아오고, 미들웨어에서 userId를 받아와서 댓글 작성 권한을 확인한다.(삭제한 기능_댓글 조회 주석 참고) 
    comment의 입력값을 확인한 뒤에 try/catch 문에서 postId, comment, userId를 createComment에 담아 보내서 댓글을 작성한다.
    */
    createComment = async (req, res, next) => {
        const { postId } = req.params;
        const { comment } = req.body;
        const { userId } = res.locals;

        // const { authorization } = req.headers;
        /* const verifyComment = jwt.verify(authorization, "hohoho");
        if (verifyComment.postId !== postId) {
            return res.status(400).json({ errorMessage: "권한이 없습니다." });
        }
        res.status(400).json({
            errorMessage: error.name,
        }); */

        if (!comment) {
            res.status(404).json({
                errorMessage: "데이터 형식을 확인해주세요.",
            });
            return;
        }
        try {
            await this.commentsService.createComment(userId, postId, comment);
            res.status(201).json();
        } catch (error) {
            res.status(400).json({ errorMessage: "error" });
        }
    };

    //댓글 수정
    /* commentId, newComment, userId를 updateComment에 담아서 commentservice로 보내고
    CommentsRepository에서 데이터를 처리한다.
     */
    updateComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { newComment } = req.body;
        const { userId } = res.locals;

        if (!newComment) {
            res.status(404).json({
                errorMessage: "데이터 형식을 확인해주세요.",
            });
            return;
        }

        const updateComment = await this.commentsService.updateComment(
            userId,
            commentId,
            newComment
        );

        if (updateComment.errorMessage) {
            res.status(400).json({ errormessage: updateComment.errorMessage });
        } else {
            res.status(200).json("댓글 수정완료");
        }
    };

    //댓글 삭제
    /* commentId, password, userId를 받아와서 deleteComment에 담아서 CommentsService로 보낸다.
    CommentsRepository에서 데이터를 처리하고 받아온 deleteComment를 리턴한다.*/
    deleteComment = async (req, res, next) => {
        const { commentId } = req.params;
        const { password } = req.body;
        const { userId } = res.locals;

        if (!password) {
            res.status(404).json({ errorMessage: "비밀번호를 입력해주세요." });
            return;
        }

        const deleteComment = await this.commentsService.deleteComment(
            commentId,
            password,
            userId
        );

        if (deleteComment.errorMessage) {
            res.status(400).json({ errormessage: deleteComment.errorMessage });
        } else {
            res.status(200).json("댓글 삭제완료");
        }
    };
}

module.exports = CommentsController;
