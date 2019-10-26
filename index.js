const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const connection = require("./connection/config");

// Initialize authentication strategies
require('./routes/security/authentication')
const passport    = require('passport');

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

connection.connectDB();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/api/user", passport.authenticate('jwt', {session: false}), userRoute);
app.use("/api/auth", authRoute);

// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(8080);

console.log('App is listening on port 8080');

process.on("SIGINT", () => {
    connection.disconnectDB();
    process.exit(0);
});
