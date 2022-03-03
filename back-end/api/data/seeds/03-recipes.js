const recipes = [
  {
    recipe_name: 'Spaghetti', 
    recipe_source: 'kim',
    recipe_ingredients: "pasta, canned tomatoes, ground beef, Trader Joe meatballs, mushrooms, onions, garlic, italian seasoning, garlic powder, salt, sugar, fish sauce, chili flakes",
    recipe_instructions: "1. boil pasta, 2. make sauce, 3. season and serve",
    recipe_category: 'Pasta',
    user_id: 1
  },
  {
    recipe_name: 'Chicken Pho', 
    recipe_source: 'kim',
    recipe_ingredients: "rice noodles, chicken, onion, ginger, fish sauce, salt, rock sugar, mushroom seasoning, bean sprout, thai basil, lime, green onion, cilantro",
    recipe_instructions: "1. make bone broth, 2. boil rice noodles, 3. season and serve",
    recipe_category: 'Soup',
    user_id: 1
  },
];

exports.seed = function(knex) {
return knex('recipes').insert(recipes)
}