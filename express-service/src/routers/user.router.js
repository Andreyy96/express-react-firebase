const {Router} = require('express');
const {userController} = require('../controllers/user.controller')


const router = Router();

router.get(
    "/current-user",
    userController.getCurrentUser,
);

router.get(
    "/:id",
    userController.getById,
);

module.exports = {
    userRouter: router
}