<template>
   <div>
      <Camera @snap="takePicture" />
      <canvas ref="canvas"></canvas>
      <form @submit.prevent="handleSubmit">
         <label for="name"><h2>Your name</h2></label>
         <input
            v-model="formData.name"
            type="text"
            name="name"
            class="form-control"
            required
         />
         <button type="submit">Save</button>
      </form>
   </div>
</template>

<script>
import Camera from "../Media/Camera"
import { CREATE_USER } from "@/store/actions.type"

export default {
   name: "FormCreateUser",
   components: {
      Camera,
   },
   data() {
      return {
         formData: {
            name: "",
         },
      }
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
         ctx.drawImage(
            document.querySelector("video"),
            0,
            0,
            picture.width,
            picture.height
         )
         console.log(picture.toDataURL());
      },
      handleSubmit() {
         this.$store.dispatch(CREATE_USER, this.formData)
      },
   },
}
</script>