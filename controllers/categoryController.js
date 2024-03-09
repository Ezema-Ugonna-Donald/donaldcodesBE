module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("category", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postImage: {
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
            type: DataTypes.DATETIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATETIME,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }

    },
    {
        timestamps: false
    })

    return Posts
}