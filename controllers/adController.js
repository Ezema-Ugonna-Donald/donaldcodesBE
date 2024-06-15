const db = require("../models/index.js")

const Ad = db.ads

const User = db.users

User.hasMany(Ad, { foreignKey: "user_id" })
Ad.belongsTo(User, { foreignKey: "user_id" })

const createAd = async (req, res) => {
    let data = {
        user_id: req.body.user_id,
        companyname: req.body.companyname,
        companyEmail: req.body.companyEmail,
        companyPhone: req.body.companyPhone,
        companyWebsite: req.body.companyWebsite,
        adImage: req.body.adImage,
        body: req.body.body
    }

    const ad = await Ad.create(data)

    res.status(201).send({"message": "Ad Created Successfully"})
}

const getAllAds = async (req, res) => {
    let ads = await Ad.findAll({
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
    })

    res.status(200).send(ads)
}

const updateAd = async (req, res) => {
    let id = req.params.id
    
    const ad = await Ad.update(req.body, { where: { id: id } })

    res.status(200).send({"message": "Ad Updated Successfully"})
}

const deleteAd = async (req, res) => {
    let id = req.params.id

    await Ad.destroy({ where: { id: id } })

    res.status(200).send({"message": "Ad Deleted Successfully"})
}

module.exports = {
    createAd,
    getAllAds,
    updateAd,
    deleteAd
}