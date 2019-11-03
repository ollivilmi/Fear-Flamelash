const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const database = require("./database/config");
// const multer = require('multer')
app.use(require('express-fileupload')(
{ limits: { fileSize: 50 * 1024 * 1024 }}
));

// Initialize authentication strategies
require('./routes/security/authentication')
const passport    = require('passport');

database.connect(process.env.MONGO_DB);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/user", passport.authenticate('jwt', {session: false}), require("./routes/userRoute"));
app.use("/api/character", passport.authenticate('jwt', {session: false}), require("./routes/charRoute"));
app.use("/api/event", passport.authenticate('jwt', {session: false}), require("./routes/eventRoute"));

// Handles any requests that don't match the ones above
app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(8080);

console.log('App is listening on port 8080');

process.on("SIGINT", () => {
    database.disconnect();
    process.exit(0);
});
