const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');
const Users = require('../users/users-model');

//http get :9000/api/recipes Authorization:decodedToken
const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return next({ status: 401, message: 'Token required '});
    }
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
        if(err) {
            return next({ status: 401, message: 'Token invalid' });
        }
        req.decodedToken = decodedToken;
        return next();
    });
};

const checkUsernameTaken = async (req, res, next) => {
    try {
        const [user] = await Users.findBy({ username: req.body.username });
        if(user) {
            next({ status: 401, message: 'Username is taken, please choose another one.' })
        } else {
            next();
        }
    } catch(err) {
        next(err);
    }
};

const checkUsernameExists = async (req, res, next) => {
    try {
        const user = await Users.findBy({ username: req.body.username }).first();
        if(!user) {
            next({ status: 401, message: 'Invalid login credentials'})
        } else {
            req.user = user
            next()
        }
    } catch(err) {
        next(err);
    }
};

const validateData = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
        res.status(400).json({ message: 'username and password are required' })
    } else {
        next()
    }
};

module.exports = {
    restricted,
    checkUsernameTaken,
    checkUsernameExists,
    validateData
};