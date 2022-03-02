const router = require('express').Router();
const Recipes = require('../recipes/recipes-model');
const { checkUserId, checkRecipeId, checkUserIdParams } = require('./recipes-middleware');

router.get('/', (req, res, next) => {
    Recipes.getAllRecipes()
        .then(recipes => {
            res.json(recipes);
        }) 
        .catch(next);
});

router.get('/:recipe_id', checkRecipeId, async (req,res,next) => {
    try {
        const recipe = await Recipes.getById(req.recipeId);
        if(recipe) {
            res.status(200).json(item);
        } else {
            res.status(401).json({
                message: `Recipe with ID ${req.recipeId} does not exist.`,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/user/:user_id', checkUserIdParams, async (req, res, next) => {
    try {
        const userRecipes = await Recipes.getUserRecipes(req.params.user_id);
        if (userRecipes.length !== 0) {
            res.status(200).json(userRecipes);
        } else {
            res.status(401).json({
                message: `No items added by user with ID ${req.params.user_id}`,
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/', checkUserId, async (req, res, next) => {
    try {
        const newRecipe = await Recipes.addRecipe({
            ...req.body,
            user_id: req.userId,
        });
        res.status(201).json(newRecipe);
    } catch(err) {
        next(err);
    }
});

router.delete('/:recipe_id', checkRecipeId, async (req, res, next) => {
    try{
        const recipeToDelete = await Recipes.remove(req.params.recipe_id);
        res.status(200).json({message: `Deleted ${recipeToDelete} item.` });
    } catch(err) {
        next(err);
    }
});

module.exports = router;