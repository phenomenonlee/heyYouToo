const UsersService = require("../services/users.service");

class UsersController {
    usersService = new UsersService();

    //회원가입
    createUser = async ( req, res, next) => {
        const { id, password, confirmPw, nickName } = req.body;

        const {authorization} = req.headers;
        if (authorization) {
            res.status(400).send({
                errorMessage: "이미 로그인 되었습니다.",
            });
            return;
        };
        //비밀번호와 비밀번호 확인란 일치하지않을 경우 메세지 출력
        if (password !== confirmPw) {
            res.status(400).send({
                errorMessage:"비밀번호가 일치하지 않습니다",
            });
            return;
        };
        //회원가입 부합테스트 //닉네임 추가하고 아이디는 이메일 형식으로
        const idRegExp = /^[a-zA-z0-9]{4,}$/; // 닉네임이 3자리이상 영문대소문자,숫자로 입력하게.
        if (!idRegExp.test(id) || password.search(id) > -1) {
            res.status(400).send({
                errorMessage:
                    "id: 4자리 이상 영문 대소문자와 숫자로 입력하세요 / 패스워드:  id와 같은 단어 포함 금지",
            });
            return;
        };
        // 서비스 계층에 구현된 creatUser 로직을 실행합니다.
        await this.usersService.createUser(res,id,nickName);
        
        res.status(201).json({ success : true });
    };

    //로그인
    loginUser = async ( req, res, next) => {
        const { id,password } = req.body;

        const {authorization} = req.headers;
        
        if (authorization) {
            res.status(400).send({
                errorMessage: "이미 로그인 되었습니다.",
            });
            return;
        };
        
        const token = await this.usersService.loginUser(res, id, password);
        
        res.status(201).json({token});
    };

}

module.exports = UsersController;
