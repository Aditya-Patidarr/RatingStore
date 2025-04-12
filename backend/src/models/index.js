const db = require("../config/db.config.js");

const User = require("./user.model.js");
const Store = require("./store.model.js");
const Rating = require("./rating.model.js");

const initDb = () => {
    db.sync()
        .then(() => {
            console.log("Database synchronized successfully.");
        })
        .catch((error) => {
            console.error("Error synchronizing the database:", error);
        });
};

module.exports = {
    User,
    Store,
    Rating,
    initDb,
};