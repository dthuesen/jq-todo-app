# JQUERY SPA with NodeJS API and MongoDB
This app is coded along a tutorial to refresh some JQuery.
It is served on NodeJS with CRUD API for creating, editing and deleting simple todo tasks. The tasks will be saved in a MongoDB database.

# Setup Instructions

- `npm i` in both directories server and client.
- Run MongoDB with the command `mongod`.
- `cd` into the 'server' directory and run the server with `nodemon` or `node app.js`.
- `cd` into the client directory and run the command `gulp` for making sure the app is transpiled.
- Then run an http server in the client directory e.g. with the command `python -m http.server 8000`.
- Now open a browser on `http://localhost:8000` and the app should run without problems.