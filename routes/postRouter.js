const postController = require("./../controllers/postController.js")

const { Router } = require("express")

const router = Router()

router.post("/add-post", postController.addPost)

router.get("/view", postController.getAllPosts)

router.get("/view/:id", postController.getPostById)

router.put("/:id", postController.updatePost)

router.delete("/:id", postController.deletePost)

module.exports = router

