const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const connection = require("./connection/config");

const userRoute = require("./routes/user");

connection.connectDB();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRoute);

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
