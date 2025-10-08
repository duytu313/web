const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");

const sequelize = require("../config/db").sequelize;
const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
