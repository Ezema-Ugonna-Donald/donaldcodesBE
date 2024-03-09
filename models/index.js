const dbConfig = require ("./../config/dbconfig.js")
const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log("Connected to Sequelize")

    })
    .catch(err => {
        console.error(`Error: ${err}`);
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.posts = require("./postModel")(sequelize, DataTypes)
db.categories = require("./categoryModel")(sequelize, DataTypes)
db.comments = require("./commentModel")(sequelize, DataTypes)
db.users = require("./userModel")(sequelize, DataTypes)
db.ads = require("./adModel")(sequelize, DataTypes)

db.sequelize.sync({ force: false })
    .then (() => {
        console.log("Resyncing with database done!")
    })

module.exports = db