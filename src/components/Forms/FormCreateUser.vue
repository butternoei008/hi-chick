<template>
   <div>
      <Camera @snap="takePicture" />
      <canvas ref="canvas"></canvas>
      <form action="">
         <label for="nickname"><h2>Your name</h2></label>
         <input type="text" name="nickname" class="form-control" required />
      </form>
   </div>
</template>

<script>
import Camera from "../Media/Camera"

export default {
   name: "FormCreateUser",
   components: {
      Camera,
   },
   methods: {
      takePicture() {
         const ratio = window.innerHeight < window.innerWidth ? 16 / 9 : 9 / 16
         const picture = this.$refs.canvas

         picture.width = window.innerWidth < 1280 ? window.innerWidth : 1280
         picture.height = window.innerWidth / ratio

         const ctx = picture.getContext("2d")

         ctx.imageSmoothingEnabled = true
         ctx.imageSmoothingQuality = "high"
         ctx.drawImage(document.querySelector("video"), 0, 0, picture.width, picture.height)
      }
   }
}
</script>