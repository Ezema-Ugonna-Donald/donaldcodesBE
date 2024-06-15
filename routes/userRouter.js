const userController = require("./../controllers/userController.js")

const { Router } = require("express")

const router = Router()

router.post("/login", userController.login)

router.post("/add-admin", userController.addAdmin)

router.get("/admins", userController.getAdminUsers)

router.get("/admin/:id", userController.getAdminUserById)

router.patch("/admin/:id", userController.updateUser)

router.delete("/admin/:id", userController.deleteAdmin)

module.exports = router