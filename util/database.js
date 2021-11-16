const Sequelize = require('sequelize')
const sequelize = new Sequelize('node-complete', 'root', 'Sangbk_@208', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;