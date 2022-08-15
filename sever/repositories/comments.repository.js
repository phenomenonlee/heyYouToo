const{ Comment, User } = require("../../models");
const bcrypt = require("bcrypt");

class CommentsRepository {

    //댓글 조회
    findAllcomment = async (postId) => {
        const comments = await Comment.findAll({where : {postId}});
        return comments;
    };
        
    //댓글 작성
    createComment = async (userId, postId, comment) => {
        const userInfo = await User.findOne({ raw: true, where: {userId}})
        console.log("---",userInfo,"---")
        const createCommentData = await Comment.create({
            postId,
            userId,
            nickname:userInfo.nickName,
            comment,
        });
        console.log("createCommentData","=====",createCommentData,)
        return createCommentData;
    };
    //댓글 수정
    updateComment = async (userId, commentId, newComment) => {
        const comment = await Comment.findByPk(commentId);
        const userInfo = await User.findByPk(userId)
        
        //다른 유저가 작성한 댓글을 수정하려고 할 때
        if(userId !== comment.userId){
            return {errorMessage: '사용자가 작성한 댓글이 아닙니다.'}
        }
       
        //댓글 업데이트
        if(comment){ 
            await Comment.update(
                {comment:newComment},{where: {commentId:comment.commentId}}
            )
                return true;
        }else{
            return {errorMessage: '댓글이 존재하지 않습니다.'};
        }
       
    };


    //댓글 삭제
    deleteComment = async (commentId, password, userId) => {
        const comment = await Comment.findByPk(commentId);
        const userInfo = await User.findOne({ raw: true, where: {userId}})

        if(userId !== comment.userId){
            return {errorMessage: '댓글을 작성한 사용자가 아닙니다.'}
        };
 
        const hashpassword = await User.findOne({where: {userId}})
        const validPassword = await bcrypt.compare(
            password,
            hashpassword.password
        );

        if(!validPassword){
            return {errorMessage: '비밀번호가 다릅니다.'}
        };
        
        if(comment){
             await Comment.destroy({where: {commentId:comment.commentId}})
             const user = await User.findByPk(userId);
             return user;

        }else{
            return {errorMessage: '댓글이 존재하지 않습니다.'};
        }
    };
    }



module.exports = CommentsRepository;
