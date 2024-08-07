const db = require("../models/index.js")

const { Op } = require("sequelize")

const Post = db.posts

const User = db.users

const jwt = require("./../middleware/index.js")

User.hasMany(Post, { foreignKey: "user_id" })
Post.belongsTo(User, { foreignKey: "user_id" })

const addPost = async (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    // req.user = result.data
        
    let data = {
        user_id: req.body.user_id,
        title: req.body.title,
        categories: req.body.categories,
        post_image: req.body.post_image,
        body: req.body.body,
        no_approved_comments: 0
    }

    const post = await Post.create(data)

    res.status(201).send({"message": "Post Created Successfully"})

    // console.log(post)
}

const getAllPosts = async (req, res) => {
    let posts = await Post.findAll({
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
    })

    res.status(200).send(posts)
}

const getPostById = async (req, res) => {
    let id = req.params.id

    let post = await Post.findOne({ 
        where: { id: id },
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(post)
}

const getPostsByCategory = async (req, res) => {
    let categoryname = req.params.categoryname

    let posts = await Post.findAll({ 
        where: { categories: categoryname },
        include: [{
            model: User,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(posts)
}

const searchPosts = async (req, res) => {
    const search = req.params.searchField
    const posts = await Post.findAll({
        where: {
            [Op.or]: [
                { title: {
                  [Op.like]: `%${search}%`
                }},
                { categories: {
                  [Op.like]: `%${search}%`
                }},
                { body: {
                  [Op.like]: `%${search}%`
                }}
            ]
        }
    })

    res.status(200).send(posts)
}

const updatePost = async (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    let id = req.params.id
    
    const post = await Post.update(req.body, { where: { id: id } })

    res.status(200).send({"message": "Post Updated Successfully"})
}

const deletePost = async (req, res) => {
    console.log("deleting")
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })
        
    let id = req.params.id

    await Post.destroy({ where: { id: id } })

    res.status(200).send({"message": "Post Deleted Successfully"})
}

module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    getPostsByCategory,
    searchPosts,
    updatePost,
    deletePost
}