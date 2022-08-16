const UsersRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");

class UsersService {
    usersRepository = new UsersRepository();

    //회원가입
    createUser = async (id, password, confirmPw, nickName) => {
        if (!id || !password || !confirmPw || !nickName) {
            return { status: 400, message: "항목을 모두 입력해주세요." };
        }
        //아이디 이메일정규식
        const emailcheck =
            /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
                id
            );
        if (!emailcheck) {
            return { status: 400, message: "이메일형식으로 입력하세요." };
        };
        //아이디 중복검사
        const existsid = await this.usersRepository.findUserByid(id);
        if (existsid) {
            return { status: 400, message: "이미 사용중인 아이디입니다." };
        };
         //비밀번호 정규식
         const passwordCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{4,13}$/.test(password);
        if (!passwordCheck) {
            return { status: 400, message: "영문 대소문자 특수문자 포함 8자 이상 13자 이내로 입력하세요" }
        };
        //닉네임 정규식
        const nickNameCheck = /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(nickName);
        if(!nickNameCheck){
            return { status: 400, message: "특수문자 사용금지. 2 ~ 12자 이내" };
        };

        //닉네임 중복검사
        const existsnickName = await this.usersRepository.findUserBynN(
            nickName
        );
        if (existsnickName) {
            return { status: 400, message: "이미 사용중인 닉네임입니다." };
        };

        //아이디 닉네임 동일성 검사
        if (password.includes(id)) {
            return { status: 400, message: "아이디와 비밀번호가 동일합니다." };
        };
        //비밀번호 일치여부
        if (password !== confirmPw) {
            return {
                status: 400,
                message: "비밀번호와 비밀번호 확인란이 다릅니다.",
            };
        }

        await this.usersRepository.createUser(id, password, nickName);
        return { status: 201, message: "회원 가입 성공" };
    };

    //로그인
    loginUser = async (id, password) => {
        if (!id || !password) {
            return { status: 400, message: "Input value is empty" };
        }
        //아이디 확인
        const loginUserdata = await this.usersRepository.findUserId(id);
        if (!loginUserdata) {
            return { status: 400, message: "아이디 또는 비밀번호가 다릅니다." };
        }
        const hashpassword = await User.findOne({
            where: { id: loginUserdata.id },
        });

        const validPassword = await bcrypt.compare(
            password,
            hashpassword.password
        );
        if (!validPassword) {
            return { status: 400, message: "아이디 또는 비밀번호가 다릅니다." };
        }
        const token = jwt.sign(
            {
                userId: loginUserdata.userId,
                nickname: loginUserdata.nickname,
            },
            "hohoho"
        );
        return { token };
    };
}

module.exports = UsersService;
