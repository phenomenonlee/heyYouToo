const UsersService = require("../services/users.service");

class UsersController {
    usersService = new UsersService();

    //회원가입
    createUser = async ( req, res, next) => {
        const { id, password, confirmPw, nickName } = req.body;

        const response = await this.usersService.createUser(
            id,
            password,
            confirmPw,
            nickName
          );
      
          res
            .status(response.status)
            .json(response.message);
        };

        // 서비스 계층에 구현된 creatUser 로직을 실행합니다.
        //await this.usersService.createUser(id,password,nickName);
        
        //res.status(201).json({ success : true });
    

    //로그인
    loginUser = async (req, res, next) => {
        const { id, password } = req.body;
    
        const response = await this.usersService.loginUser(id, password);
        res.cookie('Bearer',response.token,{maxAge: 180000})
    
        res
          .status(response.status)
          .json(response.message);
      };



    // loginUser = async ( req, res, next) => {
    //     const { id,password } = req.body;

    //     const {authorization} = req.headers;
        
    //     if (authorization) {
    //         res.status(400).send({
    //             errorMessage: "이미 로그인 되었습니다.",
    //         });
    //         return;
    //     };
        
    //     const token = await this.usersService.loginUser( id, password);
        
    //     res.status(201).json({token});
    // };

}

module.exports = UsersController;
