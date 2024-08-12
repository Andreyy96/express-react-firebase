const {userService} = require('../services/user.service')

class UserController {


    async getCurrentUser(req, res, next) {
        try {
            const data = await userService.getCurrentUser();
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const userId = req.params.id;

            const data = await userService.getById(userId);
            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = {
    userController: new UserController()
}