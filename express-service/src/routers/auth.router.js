 const {Router} = require('express');
const {commonMiddleware} = require('../middlewares/common.middleware')
const {UserValidator} = require('../validators/user.validator')
const {authController} = require('../controllers/ayth.controller')


const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isReqBodyValid(UserValidator.schemaForRegister),
    authController.signUp,
);

router.post(
    "/sign-in",
    commonMiddleware.isReqBodyValid(UserValidator.schemaForLogin),
    authController.signIn,
);

 router.delete(
     "/sign-out",
     authController.signOut,
 );

 module.exports = {
  authRouter: router
 }