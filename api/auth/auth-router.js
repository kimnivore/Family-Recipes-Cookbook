
// function getAllUsers() { return db('users') }
// async function insertUser(user) {
//     // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//     // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//     const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//     return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
//   }
//   router.get('/api/users', async (req, res) => {
//     res.json(await getAllUsers())
//   })
  
//   router.post('/api/users', async (req, res) => {
//     res.status(201).json(await insertUser(req.body))
//   })

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const tokenBuilder = require('./token-builder');

const router = require('express').Router();
const { checkUsernameTaken, checkUsernameExists, validateData } = require('./auth-middleware');
const { JWT_SECRET, BCRYPT_ROUNDS } = require('../secrets');


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


module.exports = router;