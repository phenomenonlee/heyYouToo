const UsersService = require("../services/users.service");

class UsersController {
    usersService = new UsersService();
}

module.exports = UsersController;
