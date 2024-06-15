const db = require("../models/index.js")

const Category = db.categories

const User = db.users

User.hasMany(Category, { foreignKey: "user_id" })
Category.belongsTo(User, { foreignKey: "user_id" })

const addCategory = async (req, res) => {
    let data = {
        user_id: req.body.user_id,
        categoryname: req.body.categoryname
    }

    const category = await Category.create(data)

    res.status(201).send({"message": "Category Created Successfully"})

    console.log(category)
}

const getAllCategories = async (req, res) => {
    let categories = await Category.findAll({
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
    })

    res.status(200).send(categories)
}

const getCategoryById = async (req, res) => {
    let id = req.params.id

    let category = await Category.findOne({ 
        where: { id: id },
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(category)
}

const updateCategory = async (req, res) => {
    let id = req.params.id
    
    const category = await Category.update(req.body, { where: { id: id } })

    res.status(200).send({"message": "Category Updated Successfully"})
}

const deleteCategory = async (req, res) => {
    let id = req.params.id

    await Category.destroy({ where: { id: id } })

    res.status(200).send({"message": "Category Deleted Successfully"})
}

module.exports = {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory, 
    deleteCategory
}