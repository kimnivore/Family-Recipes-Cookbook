const bcrypt = require('bcryptjs');
const { BCRYPT_ROUNDS } = require('../../secrets');

const users = [
        {username: 'kim', password: bcrypt.hashSync('1234', BCRYPT_ROUNDS)},
        {username: 'yong', password: bcrypt.hashSync('5678', BCRYPT_ROUNDS)},
        {username: 'kiki', password: bcrypt.hashSync('abcd', BCRYPT_ROUNDS)},
        {username: 'titi', password: bcrypt.hashSync('efgh', BCRYPT_ROUNDS)},
];

exports.seed = function(knex) {
  return knex('users').insert(users)
}