const {authService} = require('../services/auth.service')

class AuthController {
    async signUp(req, res, next) {
        try {
            const dto = req.body

            const data = await authService.signUp(dto);

            res.status(201).json(data);
        } catch (e) {
            next(e);
        }
    }

    async signIn(req, res, next) {
        try {
            const dto = req.body
            console.log(dto)
            const data = await authService.signIn(dto);

            res.status(200).json(data);
        } catch (e) {
            next(e);
        }
    }

    async signOut(req, res, next) {
        try {
            await authService.signOut();
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = {
    authController: new AuthController()
}