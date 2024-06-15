const categoryController = require("./../controllers/categoryController.js")

const { Router } = require("express")

const router = Router()

router.post("/add-category", categoryController.addCategory)

router.get("/", categoryController.getAllCategories)

router.get("/:id", categoryController.getCategoryById)

router.patch("/:id", categoryController.updateCategory)

router.delete("/:id", categoryController.deleteCategory)

module.exports = router

