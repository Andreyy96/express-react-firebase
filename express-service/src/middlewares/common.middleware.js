class CommonMiddleware {
     isReqBodyValid(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

module.exports = {
    commonMiddleware: new CommonMiddleware()
}