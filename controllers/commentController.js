const db = require("../models/index.js")
const { addPost } = require("./postController.js")

const Comment = db.comments

const Post = db.posts

Post.hasMany(Comment, { foreignKey: "post_id" })
Comment.belongsTo(Post, { foreignKey: "post_id" })

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

module.exports = {
    getAllCommentsByPostId,
    addComent,
    getAllApprovedComments,
    getAllDisapprovedComments
}