const { User } = require("../../models");
const bcrypt = require("bcrypt");

class UsersRepository {
    findAllUser = async () => {
        const users = await User.findAll({
            order: [["createdAt", "desc"]],
        });

        return users;
    };
    //유저아이디
    findUserId = async (id) => {
        const Id = await User.findOne({
            where: { id },
        });
        return Id;
    };
    //유저비밀번호
    findUserByid = async (id) => {
        const user = await User.findOne({
            where: { id },
        });

        return user;
    };
    //유저닉네임
    findUserBynN = async (nickname) => {
        const user = await User.findOne({
            where: { nickname },
        });

        return user;
    };
    //유저생성
    createUser = async (id, password, nickname) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            id,
            nickname,
            password: hashpassword,
        });

        return user;
    };

    checkUser = async (id) => {
        const checkUser = await User.findOne({ where: { id } });
        return checkUser;
    };
}

module.exports = UsersRepository;


//레포지트리에서는 필요한 데이터들을 DB에서 가져와 서비스로 리턴시키는 역할을 한다.
//데이터와 관련된 작업은 모두 레포지트리에서 이루어 진다.