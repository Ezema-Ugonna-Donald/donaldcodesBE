module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by: {
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

    return Users
}