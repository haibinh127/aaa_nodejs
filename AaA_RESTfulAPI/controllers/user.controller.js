const Joi = require('joi');

const UserModel = require('../models/user.model');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

function registerValidate(data) {
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            email: Joi.string().email().min(10).required(),
            password: Joi.string().min(6).required()
        }
    )
    return schema.validate(data);
}

function loginValidate(data) {
    const schema = Joi.object(
        {
            email: Joi.string().email().min(10).required(),
            password: Joi.string().min(6).required()
        }
    )
    return schema.validate(data);
}

const register = async function (req, res) {
    //1. validation user info
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //2. check email exist in db
    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists) return res.status(404).send('Email exists in database');

    //3. bcryptjs for crypt password
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.password, salt);

    //4. create new user
    const newUser = new UserModel();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = hashPassword;

    //5. return user for client
    try {
        const user = await newUser.save();
        res.send("Create user success !");
    } catch (error) {
        console.log("Error");
        res.status(400).send(error);
    }
}

const login = async function (req, res) {
    //1. validate user
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //2. check email in database
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('User not found in database');

    //3.check password in database
    const passwordLogin = await bcrypt.compareSync(req.body.password, user.password);
    if (!passwordLogin) res.status(400).send('Password incorrect');

    //4.generated token string
    var token = jwt.sign({ id: user._id }, 'chuoibimatkotietlo');

    //5.return token for user
    res.header('auth-token', token).send({ token, user });

}

const getuser = async function (req, res) {
    try {
        const user = req.user;
        res.send({ user });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = {
    register,
    login,
    getuser
}