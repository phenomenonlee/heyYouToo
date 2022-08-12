const MypageService = require("../services/comments.service");

class MypageController {
    mypageService = new MypageService();
}

module.exports = MypageController;
