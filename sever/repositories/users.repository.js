const { User } = require("../../models");


class UsersRepository {
    //회원가입
    createUser = async (id, password, nickName,) => {
        const existUserid = await User.findOne({ where: { id } });
        const existUsernickName = await User.findOne({ where: { nickName }});
        if (existUserid){
            res.status(400).send({
                errorMessage:'이미 가입된 이메일이 있습니다',
            });
            return;
        };

        if (existUsernickName){
            res.status(400).send({
                errorMessage:'이미 가입된 닉네임이 있습니다',
            });
            return;
        }


        await User.create({ id, password, nickName });
        return;
    };
    //로그인
    loginUser = async (id, password) => {
        const loginUserData = await User.findAll({ where: { id, password } });

        if (!loginUserData) {
            res.status(400).send({
                errorMessage: "닉네임 또는 패스워드가 잘못됐습니다.",
            });
        }
        return loginUserData;
    };
}

module.exports = UsersRepository;
