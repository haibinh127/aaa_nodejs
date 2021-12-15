const jwt = require('jsonwebtoken');

const UserModel = require('../models/user.model');

async function isAuth(req, res, next) {
    const token = req.header('auth-token');

    try {
        if (!token) throw new Error("Empty Token");

        const decodeData = jwt.verify(token, 'chuoibimatkotietlo');

        const existedUser = await UserModel.findById(decodeData.id);

        if (!existedUser) throw new Error('User are not existed');

        //gan them du lieu cho req
        req.user = existedUser;
        next();

    } catch (error) {
        res.status(404).send({ message: error.message });
    }

}

module.exports = {
    isAuth
}