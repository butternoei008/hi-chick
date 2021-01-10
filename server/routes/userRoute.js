const express = require("express")
const User = require("../model/UserModel")

const router = express.Router()

router.post("/", async (req, res) => {
   const { name, time } = req.body

   try {
      const user = new User({
         name: name,
         time: time,
      })

      await user.save()

      res.json({
         result: "success",
      })
   } catch (error) {
      console.log(error)

      res.status(500).json({
         result: "error",
      })
   }
})

router.get("/rank", async (req, res) => {
   try {
      const user = await User.find()
      .sort({ time: 1 })
      .limit(10)

      res.json({
         ranks: user
      })
   } catch (error) {
      console.log(error)

      res.status(500).json({
         result: "error",
      })
   }
})

module.exports = router
