module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("comments", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "posts",
                key: "id"
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        approved_by: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
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

    return Comments
}