<template>
   <div>
      <div>
         <h2>{{ time }}</h2>
         <Camera v-if="formData.picture === ''" />
      </div>
      <canvas class="d-none" ref="canvas"></canvas>
      <h3 v-if="massage">{{ massage }}</h3>
   </div>
</template>

<script>
import Camera from "../Media/Camera"
import { CREATE_USER } from "@/store/actions.type"
import { mapGetters } from "vuex"

export default {
   name: "FormCreateUser",
   components: {
      Camera,
   },
   data() {
      return {
         formData: {
            name: "",
            picture: "",
         },
         time: 4,
         massage: null,
      }
   },
   computed: {
      ...mapGetters(["scoreTime"])
   },
   mounted() {
      const count_down = setInterval(() => {
         if (this.time < 1) {
            clearInterval(count_down)
            this.takePicture()
            document.querySelector("video").style.display = "none"
         } else {
            this.time--
         }
      }, 1000)
   },
   methods: {
      takePicture() {
         const picture = this.$refs.canvas
         const video = document.querySelector("video")

         picture.classList.remove("d-none")
         picture.width = video.offsetWidth
         picture.height = video.offsetHeight

         const ctx = picture.getContext("2d")

         ctx.imageSmoothingEnabled = true
         ctx.imageSmoothingQuality = "high"
         ctx.drawImage(video, 0, 0, picture.width, picture.height)

         this.formData.picture = picture.toDataURL("image/png")
         this.voiceSpeak()
      },
      voiceSpeak() {
         window.SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition

         const recognition = new window.SpeechRecognition()

         this.massage = "บอกชื่อของคุณให้เรารู้จักหน่อย ?"

         recognition.lang = "th-TH"
         recognition.start()

         recognition.onstart = function() {
            console.log("speech started");
         }

         recognition.addEventListener("result", (event) => {
            const result = event.results[0][0].transcript
            console.log(result);
            this.formData.name = result
            this.massage = `ยินดีที่ได้รู้จัก "${result}" เรากำลังบันทึกสถิติของคุณ...`
         })

         recognition.onend = () => {
            if (this.formData.name === "") {
               recognition.start()
            } else {
               this.handleSubmit()
            }
         }
      },
      handleSubmit() {
         const data = new FormData()

         data.append("name", this.formData.name)
         data.append("picture", this.formData.picture)
         data.append("time", this.scoreTime)
         
         this.$store.dispatch(CREATE_USER, data)
      },
   },
}
</script>