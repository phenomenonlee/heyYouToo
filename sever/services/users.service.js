const UsersRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");



class UsersService {
    usersRepository = new UsersRepository();

    //회원가입
    createUser = async (id, nickName) => {
        await this.usersRepository.createUser(id, pw, nickName);
        return {
            Message: "회원가입을 축하드립니다.",
        };
        
       
    };
    //로그인
    loginUser = async (res, id, password) => {
        const signinUserData = await this.usersRepository.loginUser(id, password);

        const token = jwt.sign(
            {
                userId: signinUserData[0]["userId"],
                nickName: signinUserData[0]["nickName"],
            },
            "hohoho"
        );
       

        return token;


    };    
}

module.exports = UsersService;
