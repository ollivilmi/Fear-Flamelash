const express = require('express');
const path = require('path');

const app = express();
const connection = require("./connection/config");

connection.connectDB();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

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
