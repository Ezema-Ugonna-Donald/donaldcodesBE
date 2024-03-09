module.exports = (sequelize, DataTypes) => {
    const Ads = sequelize.define("ads", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            }
        },
        companyname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        companyPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adImage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            // allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            // allowNull: false,
            defaultValue: DataTypes.NOW
        }

    },
    {
        freezeTableName: true,
        timestamps: false
    })

    return Ads
}