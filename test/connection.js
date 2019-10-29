const database = require("../database/config");

before(() => {
    database.connect(process.env.MONGO_DB_TEST);
})

after(() => {
    database.disconnect();
})