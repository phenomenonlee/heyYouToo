const { User } = require("../../models");


class UsersRepository {
    findAllUser = async () => {
        const users = await User.findAll({
            order : [['createdAt','desc']]
        });
    
        return users;
    };
    
    findUserLogin = async (id, password) => {
        const user = await User.findOne({
            where:{id,password}
        });
    
        return user;
    };
    
    findUserByid = async (id) => {
        const user = await User.findOne({
            where:{id}
        });
    
        return user;
    }
    
    findUserBynN = async (nickName) => {
        const user = await User.findOne({
            where:{nickName}
        });
    
        return user;
    };
    
    
    
    createUser = async (id, password, nickName) => {
        const user = await User.create({
            id,
            nickName,
            password
        });
    
        return user;
    };
    
}

module.exports = UsersRepository;
