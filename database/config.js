const mongoose = require("mongoose");

module.exports = {
  database: process.env.MONGO_DB,

  options: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },

  connect: function() {
    mongoose.connect(this.database, this.options);
  },

  // Disconnect connection with MongoDB Database
  disconnect: function() {
    mongoose.disconnect(this.database);
  }
};
// on mongo connection open event print a console statement
mongoose.connection.on("open", function() {
  console.log("Connected to Database (MongoDB) ");
});

// on mongo connection error event
mongoose.connection.on("error", function() {
  console.log("error in Database (MongoDB) connections");
});

// on mongo connection disconnected event
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

//listen for SIGINT event(generated with <Ctrl>+C in the terminal) and close db connection on that event
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
