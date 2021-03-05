const fs = require("fs")
const express = require("express")
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const jimp = require("jimp")
const User = require("../model/UserModel")

const router = express.Router()
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "./public/images/avatars/")
   },
   filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1]
      cb(null, uuidv4() + "." + ext)
   },
})
const upload = multer({ storage }).single("photo")

router.post("/", async (req, res) => {
   try {
      await upload(req, res, async err => {
         const file_content = req.body.picture.replace(
            /^data:image\/png;base64,/,
            ""
         )

         const rename = `${uuidv4()}.png`

         fs.writeFile(
            `./public/images/avatars/${rename}`,
            file_content,
            "base64",
            err => {
               if (err) {
                  return res.status(400).json({ massage: err.massage })
               }
            }
         )

         const { name, time } = req.body

         try {
            const user = new User({
               name: name,
               time: time,
               avatar: rename,
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
   } catch (error) {
      console.log(error)

      res.status(500).json({
         result: "error",
      })
   }
})

router.get("/rank", async (req, res) => {
   try {
      const users = await User.find()
         .sort({ time: 1 })
         .limit(10)

      const userWithImgPath = users.map(user => ({
         ...user._doc,
         avatar_path: `${process.env.VUE_APP_URL}/images/avatars/${user.avatar}`,
      }))

      res.json({
         ranks: userWithImgPath,
      })
   } catch (error) {
      console.log(error)

      res.status(500).json({
         result: "error",
      })
   }
})

module.exports = router
