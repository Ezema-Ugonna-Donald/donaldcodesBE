const db = require("../models/index.js")

const Users = db.users

module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categories: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        no_approved_comments: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.NOW,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        // updated_at: {
        //     type: DataTypes.NOW,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW
        // }

    },
    {
        freezeTableName: true,
        timestamps: false
    })

    return Posts
}