module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define("category", {
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
        categoryname: {
            type: DataTypes.STRING,
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

    return Categories
}