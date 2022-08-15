const { User } = require("../../models");
const bcrypt = require("bcrypt")

class UsersRepository {
    findAllUser = async () => {
        const users = await User.findAll({
            order : [['createdAt','desc']]
        });
    
        return users;
    };
    
    findUserId = async (id) => {
        const Id = await User.findOne({
            where:{id}
        });
    
        return Id.id;
    };

    // findUserPassword = async (password) => {
    //     const Password = await User.findOne({
    //         where: {password}
    //     });

    //     return Password;
    // }
    
    findUserByid = async (id) => {
        const user = await User.findOne({
            where:{id}
        });
    
        return user;
    };
    
    findUserBynN = async (nickName) => {
        const user = await User.findOne({
            where:{nickName}
        });
    
        return user;
    };
    
    
    
    
    
    createUser = async (id, password, nickName) => {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            id,
            nickName,
            password:hashpassword
        });
    
        return user;
    };
    
}

module.exports = UsersRepository;
