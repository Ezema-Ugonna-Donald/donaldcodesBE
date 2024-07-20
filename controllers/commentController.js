const { where } = require("sequelize")
const db = require("../models/index.js")
const { addPost } = require("./postController.js")

const Comment = db.comments

const Post = db.posts

Post.hasMany(Comment, { foreignKey: "post_id" })
Comment.belongsTo(Post, { foreignKey: "post_id" })

const jwt = require("./../middleware/index.js")

const getAllCommentsByPostId = async (req, res) => {
    let postId = req.params.postId

    let comment = await Comment.findAll({ 
        where: { 
            post_id: postId, 
            status: "ON" 
        },
        include: [{
            model: Post,
            required: false
        }],
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(comment)
}

const addComent = async (req, res) => {
    let data = {
        post_id: req.body.post_id,
        name: req.body.name,
        email: req.body.email,
        website: req.body.website,
        comment: req.body.comment,
        approved_by: "pending",
        status: "OFF"
    }

    const comment = await Comment.create(data)

    res.status(201).send({"message": "Comment Created Successfully"})
}

const getAllApprovedComments = async (req, res) => {

    let comment = await Comment.findAll({ 
        where: { 
            status: "ON" 
        },
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(comment)
}

const getAllDisapprovedComments = async (req, res) => {

    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    let comment = await Comment.findAll({ 
        where: { 
            status: "OFF" 
        },
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(comment)
}

const setApprovedCommentById = async (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    const id = req.body.id

    await Comment.update({
        status: "ON"
    }, {
        where: { id: id }
    })

    res.status(200).send({"message": "Comment Set to Approved Successfully"})
}

const setDisapprovedCommentById = async (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    const id = req.body.id

    await Comment.update({
        status: "OFF"
    }, {
        where: { id: id }
    })

    res.status(200).send({"message": "Comment Set to Disapproved Successfully"})
}

const deleteCommentById = async (req, res) => {
    const authHeader = req.headers["authorization"]

    const token = authHeader && authHeader.split(" ")[1]

    if (!token) return res.status(401).send("Unauthorized")

    const result = jwt.verifyAccessToken(token)

    if (!result.success) return res.status(403).json({ error: result.error })

    const id = req.params.id

    await Comment.destroy({ where: { id: id } })

    res.status(200).send({"message": "Comment Deleted Successfully"})
}

module.exports = {
    getAllCommentsByPostId,
    addComent,
    getAllApprovedComments,
    getAllDisapprovedComments,
    setApprovedCommentById,
    setDisapprovedCommentById,
    deleteCommentById
}