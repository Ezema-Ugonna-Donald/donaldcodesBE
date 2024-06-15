const adController = require("./../controllers/adController.js")

const { Router } = require("express")

const router = Router()

router.post("/create-ad", adController.createAd)

router.get("/", adController.getAllAds)

router.patch("/edit-ad/:id", adController.updateAd)

router.delete("/:id", adController.deleteAd)

module.exports = router