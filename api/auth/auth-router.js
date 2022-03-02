const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const tokenBuilder = require('./token-builder');

const router = require('express').Router();
const { checkUsernameTaken, checkUsernameExists, validateData, restricted } = require('./auth-middleware');
const {  BCRYPT_ROUNDS } = require('../secrets');


router.post('/register', checkUsernameTaken, validateData, async (req, res, next) => {
    let { username, password } = req.body;
    const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
    Users.add({ username, password: hash })
        .then(newUser => {
            res.status(201).json({
                message: `${newUser.username} has been successfully registered!`,
                user_id: newUser.user_id
            });
        })
        .catch(next);
});

router.post('/login', checkUsernameExists, (req, res, next) => {
    let user = req.user;
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = tokenBuilder(user);
        res.status(200).json({
            message: `Welcome ${user.username}`,
            token,
            user_id: user.user_id
        });
    } else {
        next({ status: 401, message: 'Invalid credentials' });
    }
});

router.get('/users', restricted, async (req, res) => {
    res.json(await Users.getAll());
});

router.post('/users', async (req, res) => {
    res.status(201).json(await Users.add());
});


module.exports = router;