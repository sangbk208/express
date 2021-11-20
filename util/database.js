const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-complete", "root", "Sangbk_@S208", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
