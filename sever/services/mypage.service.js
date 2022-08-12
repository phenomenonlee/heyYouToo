const MypageRepository = require("../repositories/mypage.repository");

class MypageService {
    mypageRepository = new MypageRepository();
}
module.exports = MypageService;
