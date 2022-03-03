<<<<<<< HEAD
# <p>Backend For Family Recipes Cookbook.</P>

## <p>https://family-recipes-cookbook1.herokuapp.com/</p>

## REGISTER and LOGIN ENDPOINTS

### `[POST] /api/auth/register`

- Request Body:
  - _username required (must be unique)_
  - _password required_

_What You Send_

```json
{
  "username": "coco",
  "password": "1234"
}
```

_Server Response_

```json
{
  "message": "coco has been successfully registered!",
  "user_id": 5
}
```

### `[POST] /api/auth/login`

- Request Body:
  - _username required_
  - _password required_

_What You Send_

```json
{
  "username": "coco",
  "password": "1234"
}
```

_Server Response_

```json
{
  "message": "Welcome coco!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6ImN1cnRpcyIsImlhdCI6MTY0NjI2MjEzOCwiZXhwIjoxNjQ2MzQ4NTM4fQ.GrNBAi7LJbbkkDhoXdHYQx8Y6o0FsQ3fc_4ptKDsB94",
  "user_id": 5
}
```

<p>You will use the token given by the server for authentication.</p>
<p>User ID should also be stored as this will be required in the header when adding recipes.</p>

<p>Sample Credentials you can use for login testing:</p>

- `username: kim, password: 1234`

- `username: yong, password: 5678`

### `[GET] /api/auth/users`

**_RESTRICTED ENDPOINT_** (token required)

- Returns all users in database, currently public facing but will be restricted.

_Server Response_

```json
{
  "user_id": "1",
  "username": "kim",
},
{
  "user_id": "2",
  "username": "yong",
}
"etc..."
```

<hr>

## RECIPES ENDPOINTS

### `[GET] /api/recipes/`

**_RESTRICTED ENDPOINT_** (token required)

- Returns array of all recipes in the database.
- 2 sample  have been added.

_Server Response_

```json
[   {
        "recipe_id": 1,
        "recipe_name": "Spaghetti",
        "recipe_ingredients": "pasta, canned tomatoes, ground beef, Trader Joe meatballs, mushrooms, onions, garlic, italian seasoning, garlic powder, salt, sugar, fish sauce, chili flakes",
        "recipe_instructions": "1. boil pasta, 2. make sauce, 3. season and serve",
        "recipe_category": "Pasta",
        "recipe_source": "kim",
        "user_id": 1
    },
  {
        "recipe_id": 2,
        "recipe_name": "Chicken Pho",
        "recipe_ingredients": "rice noodles, chicken, onion, ginger, fish sauce, salt, rock sugar, mushroom seasoning, bean sprout, thai basil, lime, green onion, cilantro",
        "recipe_instructions": "1. make bone broth, 2. boil rice noodles, 3. season and serve",
        "recipe_category": "Soup",
        "recipe_source": "kim",
        "user_id": 1
    },
    "etc..."

]

```
### `[POST] /api/recipes/`

**_RESTRICTED ENDPOINT_** (token AND user_id required)

- Adds a new recipe in the database. 
  - **required information:**
  - _recipe_name (string)_
  - _recipe_source (string)_
  _ _recipe_ingredients (string)_
  - _recipe_instructions (string)_
  - _recipe_category (string)_

_What You Send:_

```json
{
  "recipe_name": "Jasmine Rice",
  "recipe_source": "mom",
  "recipe_ingredients": "rice, water",
  "recipe_instructions": "1. wash rice, 2. measure water using finger trick, 3. cook in rice cooker",
  "recipe_category": "Side dish",
  "user_id": 1
}
```

_Server Response:_

```json
{
  "recipe_name": "Jasmine Rice",
  "recipe_source": "mom",
  "recipe_ingredients": "rice, water",
  "recipe_instructions": "1. wash rice, 2. measure water using finger trick, 3. cook in rice cooker",
  "recipe_category": "Side dish",
}
```

### `[GET] /api/recipes/:recipe_id`

**_RESTRICTED ENDPOINT_** (token required)

- Returns the single recipe associated with that recipe id. 

_Server Response:_

```json
{
    "recipe_id": 1,
    "recipe_name": "Spaghetti",
    "recipe_source": "kim",
    "recipe_ingredients": "pasta, canned tomatoes, ground beef, Trader Joe meatballs, mushrooms, onions, garlic, italian seasoning, garlic powder, salt, sugar, fish sauce, chili flakes",
    "recipe_instructions": "1. boil pasta, 2. make sauce, 3. season and serve",
    "recipe_category": "Pasta",
    "user_id": 1
}
```

### `[GET] /api/recipes/user/:user_id`

**_RESTRICTED ENDPOINT_** (token required)

- Returns all recipes added by a user with provided user id. 

_Server Response:_

```json
[   
     {
        "recipe_id": 1,
        "recipe_name": "Spaghetti",
        "recipe_source": "kim",
        "recipe_ingredients": "pasta, canned tomatoes, ground beef, Trader Joe meatballs, mushrooms, onions, garlic, italian seasoning, garlic powder, salt, sugar, fish sauce, chili flakes",
        "recipe_instructions": "1. boil pasta, 2. make sauce, 3. season and serve",
        "recipe_category": "Pasta",
        "user_id": 1
    },
    {
        "recipe_id": 2,
        "recipe_name": "Chicken Pho",
        "recipe_source": "kim",
        "recipe_ingredients": "rice noodles, chicken, onion, ginger, fish sauce, salt, rock sugar, mushroom seasoning, bean sprout, thai basil, lime, green onion, cilantro",
        "recipe_instructions": "1. make bone broth, 2. boil rice noodles, 3. season and serve",
        "recipe_category": "Soup",
        "user_id": 1
    },
    "etc..."

]
```
### `[PUT] /api/recipes/:recipe_id`

**_RESTRICTED ENDPOINT_** (token required)

- Updates the single recipe with provided recipe id.

_Server Response:_

```json
{
    
        "recipe_category": "side",
        "recipe_id": 4,
        "recipe_ingredients": "rice",
        "recipe_instructions": "cook",
        "recipe_name": "rice",
        "recipe_source": "mom",
        "user_id": 1
}
```

### `[DELETE] /api/recipes/:recipe_id`

**_RESTRICTED ENDPOINT_** (token required)

- Deletes the single recipe with provided recipe id.

_Server Response:_

```json
{
    "message": "Deleted 1 recipe."
}
```




<!-- # Build Week Scaffolding

First READ these instructions to get an overview of what's involved in scaffolding an Express + PostgreSQL app that deploys to Heroku.

Then watch [this video tutorial](https://bloomtech-1.wistia.com/medias/2625bl7sei) for a detailed demonstration of setting up a project, using a Windows dev machine. Other operating systems will require some adjustments.

**There will have been updates to this repo since the video tutorial was created, so make sure to read these instructions before watching.**

## The Stack and Tools

1. Web server: [Node & Express](https://expressjs.com/)
2. Development database: [PostgreSQL 14](https://www.postgresql.org/download/)
3. Dev database Graphical-User Interface tool: [pgAdmin 4](https://www.pgadmin.org/download/)
4. Dev database Command-Line Interface tool: [psql](https://www.postgresql.org/docs/14/app-psql.html)

**Note:** **pgAdmin 4** and **psql** should be bundled with the PostgreSQL installer, but they might not be the latest versions.

5. Production cloud service: [Heroku](https://id.heroku.com/login)
6. Prod database: [Heroku Postgres Addon](https://devcenter.heroku.com/articles/heroku-postgresql)
7. Prod Command-Line Interface tool: [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Important Differences between SQLite and Postgres

The SQLite database is a file embedded inside the project. PostgreSQL on the other hand is a full-blown server, separate from the Express server.

This means Postgres and its tooling must be installed on the development machine prior to scaffolding an Express + Postgres app.

Another difference is that executing migrations for the first time will not make the database pop into existance as was the case with SQLite. You must use the pgAdmin 4 GUI to create the development database by hand. Once the database exists and shows up in pgAdmin 4 you can connect to it using Knex and migrate it.

In production, we create the database by installing the Postgres Addon from the dashboard of our app on the Heroku website. You can connect pgAdmin 4 to the production db following [these instructions](https://stackoverflow.com/a/63046594/3895791).

## Installation of PostgreSQL on the Development Machine

Install [Postgres](https://www.postgresql.org/download/) on your computer, taking into account that getting psql and pgAdmin 4 up and running might require a bit of research and effort.

1. Leave the default options during the Postgres installation wizard (components, location, port number).
2. You will be asked to create a password for the superadmin "postgres" db user. Enter a simple string using only letters (e.g. "password").
3. No need to execute the "Stack Builder" at the end of the installation. You can safely uncheck that and exit the wizard.
4. The first time you open pgAdmin 4 you will be asked to create another password, this time a master password to be able to use pgAdmin.

## Starting a New Project

- Create a new repository using this template, and clone it to your local.
- Create a `.env` file and follow the instructions inside `knexfile.js`.
- Fix the scripts inside `package.json` to use your Heroku app.

## Scripts

- **start** Runs the app with Node.
- **server** Runs the app with Nodemon.
- **migrate:dev** Migrates the local development db to the latest.
- **rollback:dev** Rolls back migrations in the local dev db.
- **seed:dev** Truncates all tables in the local dev db.
- **deploy** Deploys the main branch to Heroku. Must login to the Heroku CLI and add Heroku as a remote.
- **test** Runs tests.

**The following scripts NEED TO BE EDITED before using: replace `YOUR_HEROKU_APP_NAME`**

- **migrate:prod** Migrates the Heroku database to the latest.
- **rollback:prod** Rolls back migrations in the Heroku database.
- **databaseh** Interacts with the Heroku database from the command line using psql.
- **seed:prod** Runs all seeds in the Heroku database.

## Tips

- Figure out deployment before writing any additional code.

- If you need to make changes to a migration file that has already been released to Heroku, follow this sequence:

  1. Roll back migrations in the Heroku database
  2. Deploy the latest code to Heroku
  3. Migrate the Heroku database to the latest

- If your frontend devs are clear on the shape of the data they need, you can quickly build provisional endpoints that return mock data. They shouldn't have to wait for you to build the entire backend.

- Keep your endpoints super lean: the bulk of the code belongs inside models and other middlewares.

- Validating and sanitizing client data using a library is much less work than doing it manually.

- Revealing crash messages to clients is a security risk, but during development it's helpful if your frontend devs are able to tell you what crashed exactly.

- PostgreSQL comes with [fantastic built-in functions](https://hashrocket.com/blog/posts/faster-json-generation-with-postgresql) for hammering rows into whatever JSON shape.

- If you want to edit a migration that has already been released but don't want to lose all the data, make a new migration instead. This is a more realistic flow for production apps: prod databases are never migrated down. We can migrate Heroku down freely only because there's no valuable data from customers in it. In this sense, Heroku is acting more like a staging environment than production.

- If your fronted devs are interested in running the API locally, help them set up PostgreSQL & pgAdmin on their machines, and teach them how to run migrations in their local. This empowers them to (1) help you troubleshoot bugs, (2) obtain the latest code by simply doing a `git pull` and (3) work with their own data, without it being wiped every time you roll back the Heroku db. Collaboration is more fun and direct, and you don't need to deploy as often.

## Video Demonstration

The following demo explains how to set up a project using PostgreSQL and Heroku.

[![Setting up PostgreSQL for Build Week](https://tk-assets.lambdaschool.com/e43c6d1e-5ae8-4142-937b-b865d71925fb_unit-4-build-week-project-scaffolding.png)](https://bloomtech-1.wistia.com/medias/2625bl7sei) -->
=======
# Family-Recipes-Cookbook## ☝️

Anyone can go out and buy a cookbook these days, but I want a place to store all my secret family recipes, handed down from generation to generation. 

The little cards my grandma wrote the recipes on in her beautiful cursive are getting lost or are hard to read. I need somewhere secure to keep my recipes with me at all times!

## ✅ **MVP**

1. On-boarding process for a new `user`

2. Ability to enter a new `recipe`, including `title`, `source` (ex: Grandma Ethel), `ingredients`, `instructions`, and `category` (dinner, chicken, dessert, pasta, etc) and edit or delete it later.

3. Homepage to view all entered `recipes`.

4. Ability to search for `recipes` by `title` or tagged `categories`.

## 🏃‍♀️**Stretch**

1. Ability to upload a `picture` of the original `recipe` along with the `recipe` entry.

2. By default all `recipe`s uploaded can only be viewed by the `user` logged in. A stretch goal would add the ability to invite another `user` with the link to view the `recipe`.
>>>>>>> 2a8d1ca54096c221e6480e59d398e6a0003011f4
