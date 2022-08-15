const UsersRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models");


class UsersService {
    usersRepository = new UsersRepository();

    //회원가입
    createUser = async (id, password, confirmPw,nickName) => {
        if (!id || !password || !confirmPw ||!nickName) {
          return { status: 400, message: "항목을 모두 입력해주세요." };
        };
    //아이디 이메일정규식, 비밀번호 정규식
    const emailcheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(id);
    if (!emailcheck) {
        console.log(emailcheck)
      return { status: 400, message: "이메일형식으로 입력하세요." };
    } else if (password.length < 4) {
      return { status: 400, message: "비밀번호 4자리 이상 입력하세요." };
    };
    //아이디 중복검사
    const existsid = await this.usersRepository.findUserByid(id);
    console.log(existsid)
    if (existsid) {
      return { status: 400, message: "이미 사용중인 아이디입니다." };
    };
    //닉네임 중복검사
    const existsnickName = await this.usersRepository.findUserBynN(nickName);
    console.log(existsnickName)
    if (existsnickName) {
      return { status: 400, message: "이미 사용중인 닉네임입니다." };
    }
    
    //아이디 닉네임 동일성 검사
    if (password.includes(id)) {
        return { status: 400, message: "아이디와 비밀번호가 동일합니다." };
      };

    //비밀번호 일치여부
    if (password !== confirmPw) {
        return { status: 400, message: "비밀번호와 비밀번호 확인란이 다릅니다." };
      }
    

      await this.usersRepository.createUser(
        id,
        password,
        nickName
      );
      console.log(id,nickName)
      return { status: 201, message: '회원 가입 성공' };
  
    };

   
    //로그인
    loginUser = async (id, password) => {
        if (!id || !password) {
          return { status: 400, message: "Input value is empty" };
        }
        //아이디 확인
        const loginUserdata = await this.usersRepository.findUserId(
          id,
        );
        if (!loginUserdata) {
          return { status: 400, message: "아이디 또는 비밀번호가 다릅니다." };
        };
        const hashpassword = await User.findOne({ where: { id:loginUserdata } });
        const validPassword = await bcrypt.compare(
            password,
            hashpassword.password
        );
        if (!validPassword){
          return { status: 400, message: "아이디 또는 비밀번호가 다릅니다." };
        };
        
        
    
        console.log(loginUserdata)
        const token = jwt.sign({
            userId: loginUserdata.userId,
            nickName: loginUserdata.nickName }, "hohoho")
        return {token};
    };
};

module.exports = UsersService;
