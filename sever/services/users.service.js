const UsersRepository = require("../repositories/users.repository");

class UsersService {
    usersRepository = new UsersRepository();
}

module.exports = UsersService;
