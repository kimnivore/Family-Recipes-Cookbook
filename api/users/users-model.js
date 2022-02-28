const db = require('../data/db-config');

module.exports = {
    find,
    findBy,
    findById,
    add
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users')
        .select('username', 'password')
        .where(filter)
} 

function findById(id) {
    return db('users')
        .where('id', id)
        .first()
}

async function add(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}