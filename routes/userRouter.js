const userController = require("./../controllers/userController.js")

const { Router } = require("express")

const router = Router()

router.post("/login", userController.login)

module.exports = router