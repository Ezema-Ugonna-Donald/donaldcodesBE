const express = require("express");
const cors = require("cors")
const postRouter = require("./routes/postRouter.js")
const categoryRouter = require("./routes/categoryRouter.js")
const commentRouter = require("./routes/commentRouter.js")
const userRouter = require("./routes/userRouter.js")
// console.log(require('crypto').randomBytes(64).toString('hex'))

const app = express()

let corsOptions = {
    origin: "http://localhost:3000"
}


// middleware
app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/v1/api/posts", postRouter)
app.use("/v1/api/categories", categoryRouter)
app.use("/v1/api/comments", commentRouter)
app.use("/v1/api/user", userRouter)

app.get("/", (req, res) => {
    res.json({message: "Hello World"})
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})