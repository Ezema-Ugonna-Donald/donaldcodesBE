const express = require("express");
const cors = require("cors")
const cookieParse = require("cookie-parser")
const postRouter = require("./routes/postRouter.js")
const categoryRouter = require("./routes/categoryRouter.js")
const commentRouter = require("./routes/commentRouter.js")
const userRouter = require("./routes/userRouter.js")
const adRouter = require("./routes/adRouter.js")

const jwt = require("./middleware/index.js")
// console.log(require('crypto').randomBytes(64).toString('hex'))

const app = express()

let corsOptions = {
    // origin: ["http://localhost:3000", "https://lpjm1rr4-3000.uks1.devtunnels.ms"]
    origin: "http://locahost:3000" 
    // origin: "https://lpjm1rr4-3000.uks1.devtunnels.ms" 
}


// middleware
app.use(cors(corsOptions))  

app.use(express.json())

// app.use(cookieParse())

app.use(express.urlencoded({ extended: true }))

app.use("/v1/api/posts", postRouter)
app.use("/v1/api/categories", categoryRouter)
app.use("/v1/api/comments", commentRouter)
app.use("/v1/api/users", userRouter)
app.use("/v1/api/ads", adRouter)

app.get("/v1/api/refresh", (req, res) => {

    const token = jwt.generateAccessToken({id: req.query.Id, email: req.query.Email})

    res.json({ accessToken: token })  
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})