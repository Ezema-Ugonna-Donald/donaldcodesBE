const { where } = require("sequelize")

const db = require("../models/index.js")

const crypto = require("crypto")

const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config()

const User = db.users

const login = async (req, res) => {
    // const hashKey = crypto.createHash("sha256")
    // hashKey.update("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    // const key = hashKey.digest("hex").substring(0, 32)
    // const key = ""
    // const key = atob("ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    // // const hashIV = crypto.createHash("sha256")
    // // hashIV.update("1234567812345678")
    // // const iv = hashIv.digest("hex").substring(0, 16)
    // const iv = "1234567812345678"

    // const cipher = crypto.createCipheriv("aes-128-cbc", key, iv)
    // let encrypted = cipher.update(req.body.password, "utf-8", "base64")
    // encrypted += cipher.final("base64")
    // encrypted = Buffer.from(encrypted, "utf-8").toString("base64")

    const email = req.body.email
    const password = req.body.password

    let user = await User.findOne({
        where: { email: email, password: password}
    })

    const token = jwt.sign({ name: email }, process.env.TOKEN_SECRET, { expiresIn: "7d" })

    res.status(200).send({
        user: user,
        accessToken: token
    })
}

module.exports = {
    login
}