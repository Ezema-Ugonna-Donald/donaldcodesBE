const db = require("../models/index.js")

const Comment = db.comments

const Post = db.posts

Post.hasMany(Comment, { foreignKey: "post_id" })
Comment.belongsTo(Post, { foreignKey: "post_id" })

const getAllCommentsByPostId = async (req, res) => {
    let postId = req.params.postId

    let comment = await Comment.findAll({ 
        where: { post_id: postId },
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

module.exports = {
    getAllCommentsByPostId
}