const postController = require("./../controllers/postController.js")

const { Router } = require("express")

const router = Router()

router.post("/add-post", postController.addPost)

router.get("/view", postController.getAllPosts)

router.get("/view/:id", postController.getPostById)

router.get("/view/category/:categoryname", postController.getPostsByCategory)

router.get("/view/search/:searchField", postController.searchPosts)

router.patch("/:id", postController.updatePost)

router.delete("/:id", postController.deletePost)

module.exports = router

