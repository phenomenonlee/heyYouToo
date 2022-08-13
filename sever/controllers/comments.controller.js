const CommentsService = require("../services/comments.service");

class CommentsController {
    commentsService = new CommentsService();
}

module.exports = CommentsController;
