require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

mongoose
   .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("MongoDB Connected...")
   })
   .catch(err => {
      console.log(err)
   })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static("public"))

app.use("/user", require("./routes/userRoute"))

app.listen(8085, () => {
   console.log("Server running...")
})
