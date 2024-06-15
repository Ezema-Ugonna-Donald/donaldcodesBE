const commentController = require("./../controllers/commentController.js")

const { Router } = require("express")

const router = Router()

router.post("/", commentController.addComent)
router.get("/:postId", commentController.getAllCommentsByPostId)
router.get("/all/approved", commentController.getAllApprovedComments)
router.get("/all/disapproved", commentController.getAllDisapprovedComments)
router.patch("/approve", commentController.setApprovedCommentById)
router.patch("/disapprove", commentController.setDisapprovedCommentById)
router.delete("/:id", commentController.deleteCommentById)

module.exports = router