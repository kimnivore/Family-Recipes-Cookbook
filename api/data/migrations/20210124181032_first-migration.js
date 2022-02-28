exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 32).notNullable().unique();
      users.string('password', 100).notNullable();
      users.timestamps(false, true)
    })
    .createTable('recipes', (recipes) => {
      recipes.increments('recipe_id');
      recipes.string('recipe_name', 128).notNullable();
      recipes.string('recipe_source', 128).notNullable();
      recipes.string('recipe_ingredients').notNullable();
      recipes.string('recipe_instructions').notNullable();
      recipes.string('recipe_category').notNullable();
      recipes.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('recipes');
  await knex.schema.dropTableIfExists('users');
}
