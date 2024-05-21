const commentController = require("./../controllers/commentController.js")

const { Router } = require("express")

const router = Router()

router.post("/", commentController.addComent)
router.get("/:postId", commentController.getAllCommentsByPostId)
router.get("/all/approved", commentController.getAllApprovedComments)
router.get("/all/disapproved", commentController.getAllDisapprovedComments)

module.exports = router