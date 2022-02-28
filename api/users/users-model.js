const db = require('../data/db-config');

module.exports = {
    getAll,
    findBy,
    findById,
    add
}

function getAll() {
    return db('users')
        .select('user_id', 'username');
}

function findBy(filter) {
    return db('users')
        .where(filter);
} 

function findById(id) {
    return db('users')
        .where('user_id', id)
        .first()
}

async function add(user) {
    const [newUser] = await db('users').insert(user, [
        'user_id',
        'username',
        'password',
    ]);
    return newUser;
}