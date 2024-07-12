const { where } = require("sequelize")

const db = require("../models/index.js")

const crypto = require("crypto")

const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config()

const User = db.users

const login = async (req, res) => {
    const hash = crypto.pbkdf2Sync(
        req.body.password, 
        process.env.SALT, 
        Number(process.env.ITERATIONS),
        64,
        "sha512"
    ).toString("hex")

    // const hash = crypto.createHash("sha256")
    //             .update(req.body.password)
    //             .update(createHash("sha256").update(process.env.SALT, "utf8").digest("hex"))
    //             .digest("hex")
    
    const email = req.body.email
    const password = hash

    let user = await User.findOne({
        where: { email: email, password: password} 
    })

    const token = jwt.sign({ name: email }, process.env.TOKEN_SECRET, { expiresIn: "7d" })

    res.status(200).send({
        "user": user,
        "accessToken": token,
        "message": "Logged in successfully"
    })
}

const addAdmin = async (req, res) => {
    const hash = crypto.pbkdf2Sync(
        req.body.password, 
        process.env.SALT, 
        Number(process.env.ITERATIONS),
        64,
        "sha512"
    ).toString("hex")

    // const hash = crypto.createHash("sha256")
    //             .update(req.body.password)
    //             .update(createHash("sha256").update(process.env.SALT, "utf8").digest("hex"))
    //             .digest("hex")
    
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        created_by: req.body.created_by 
    }

    const user = await User.create(data)

    res.status(201).send({"message": "Admin Added Successfully"})
}

const getAdminUsers = async (req, res) => {
    let users = await User.findAll({
        order: [
            ["id", "DESC"]
        ]
    })

    res.status(200).send(users)
}

const getAdminUserById = async (req, res) => {
    let id = req.params.id

    let user = await User.findOne({ 
        where: { id: id },
        order: [
            ["id", "DESC"]
        ]
     })

    res.status(200).send(user)
}

const updateUser = async (req, res) => {
    let id = req.params.id

    // console.log(process.env.SALT)
    const hash = crypto.pbkdf2Sync(
        req.body.password, 
        process.env.SALT, 
        Number(process.env.ITERATIONS),
        64,
        "sha512"
    ).toString("hex")

    // const hash = crypto.createHash("sha256")
    //             .update(req.body.password)
    //             .update(createHash("sha256").update(process.env.SALT, "utf8").digest("hex"))
    //             .digest("hex")
    
    let data = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        created_by: req.body.created_by
    }
    
    const user = await User.update(data, { where: { id: id } })

    res.status(200).send({"message": "User Updated Successfully"})
}

const deleteAdmin = async (req, res) => {
    let id = req.params.id

    await User.destroy({ where: { id: id } })

    res.status(200).send({"message": "Admin Deleted Successfully"})
}

module.exports = {
    login,
    addAdmin,
    getAdminUsers,
    getAdminUserById,
    updateUser,
    deleteAdmin
}