const { User } = require("../../models");
const bcrypt = require("bcrypt");

class UsersRepository {
    findAllUser = async () => {
        const users = await User.findAll({
            order: [["createdAt", "desc"]],
        });

        return users;
    };

    findUserId = async (id) => {
        const Id = await User.findOne({
            where: { id },
        });
        return Id;
    };

    findUserByid = async (id) => {
        const user = await User.findOne({
            where: { id },
        });

        return user;
    };

    findUserBynN = async (nickname) => {
        const user = await User.findOne({
            where: { nickname },
        });

        return user;
    };

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
}

module.exports = UsersRepository;
