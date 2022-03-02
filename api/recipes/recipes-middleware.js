const Users = require('../users/users-model');
const Recipes = require('./recipes-model');

const checkUserId = async (req, res, next) => {
    const userId = req.headers.user_id;
    if(!userId) {
        return next({ status: 401, message: 'User ID is required' });
    } else {
        req.userId = userId;
        const user = await Users.findById(req.userId);
        if(!user) {
            next({ status: 401, message: `User with ID ${req.userId} does not exist. `});
        } else {
            next();
        }
    }
};

const checkRecipeId = async (req, res, next) => {
    const recipeId = req.params.recipe_id;
    if(!recipeId) {
        return next({ status: 401, message: 'Recipe ID is required' });
    } else {
        req.recipeId = recipeId;
        const recipe = await Recipes.getById(req.recipeId);
        if(!recipe) {
            next({ status: 401, message: `Recipe with ID ${req.recipeId} does not exist. `});
        } else {
            next();
        }
    }
};

const checkUserIdParams = async (req, res, next) => {
    const userId = req.params.user_id;
    if(!userId) {
        return next({ status: 401, message: 'User ID is required' });
    } else {
        req.userId = userId;
        const user = await Users.findById(req.userId);
        if(!user) {
            next({ status: 401, message: `User with ID ${req.userId} does not exist.` });
        } else {
            next();
        }
    }
};

module.exports = {
    checkUserId,
    checkRecipeId,
    checkUserIdParams,
};