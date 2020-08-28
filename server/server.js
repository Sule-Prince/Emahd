const http = require("http")
const express = require("express")
const path = require("path")

const app = express()

const server = http.createServer(app)
const PORT = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, "..", "build")))

app.get("/*", (req, res) => {
    res.sendFile("C:/Users/USER/Desktop/EMahd/client/build/index.html")
})




server.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
    console.log(path.join(__dirname, "..", "build"))
})