const db = require('../data/db-config');

function getAllRecipes() {
    return db('recipes');
}

function getById(id) {
    return db('recipes').where('recipe_id', id).first();
}

function getUserRecipes(user_id) {
    return db('recipes').where('user_id', user_id);
}

async function addRecipe(recipe) {
    const [newRecipe] = await db('recipes').insert(recipe, [
        'recipe_name',
        'recipe_source',
        'recipe_ingredients',
        'recipe_instructions',
        'recipe_category'
    ]);
    return newRecipe;
}

function updateRecipe(id, changes) {
    return db('recipes')
        .where('recipe_id', id)
        .update(changes)
        .then((count) => (count > 0 ? getById(id) : null));
}

function removeRecipe(recipe_id) {
    return db('recipes').where({ recipe_id }).del();
}


module.exports = {
    getAllRecipes,
    getById,
    getUserRecipes,
    addRecipe,
    updateRecipe,
    removeRecipe
}
