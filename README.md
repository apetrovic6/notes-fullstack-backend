# Test it out live: https://notes.antepetrovic.tech
# Check out the frontend code repo: https://github.com/apetrovic6/notes-fullstack-frontend

# Notes app 
The REST API is made with NodeJS and Express.

## What it's all about?

The goal of this app was to build a note taking app with basic CRUD functionality.
The user is able to:

- [x] Sign up 
- [x] Log In
- [x] See all the notes he created
- [x] Create a new note 
- [x] Update a note 
- [x] Delete a note 

## The Backend 

- [x] Save the user credentials in the database and hash the password
- [x] Upon logging in send a JSON Web Token for authorization
- [x] Fetching the note data from MongoDB
- [x] API Routes for CRUD functionality

## Tech used

- NodeJS
- Express
- JSON Web Tokens
- MongoDB
- NextJS
- TailwindCSS

## How to start up the project?

You'll have to provide your own config file.
In the root directory create a folder named config and create keys.js file in the folder.

Put this code into the keys.js file.
``` bash
const mongo = "";
const jwtToken = "";

module.exports.mongo = mongo;
module.exports.jwtToken = jwtToken;
```
Paste in the database connection url in the mongo variable. (You can get a free account on [https://cloud.mongodb.com/](https://cloud.mongodb.com/))
You can put whatever string you want in the jwtToken variable.

Run the development server:

```bash
npm i
nodemon index.js
```

The server is running on: [http://localhost:5000](http://localhost:5000). 
