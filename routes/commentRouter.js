const commentController = require("./../controllers/commentController.js")

const { Router } = require("express")

const router = Router()

router.get("/:postId", commentController.getAllCommentsByPostId)

module.exports = router