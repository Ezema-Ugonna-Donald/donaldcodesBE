const express = require("express");
const cors = require("cors")
const postRouter = require("./routes/postRouter.js")

const app = express()

let corsOptions = {
    origin: "http://localhost:5173"
}


// middleware
app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use("/v1/api/posts", postRouter)

app.get("/", (req, res) => {
    res.json({message: "Hello World"})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})