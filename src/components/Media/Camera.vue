<template>
   <div>
      <video class="camera" ref="camera" autoplay></video>
      <!-- <button v-if="typeof snap !== 'undefined'" type="button" @click="$emit('snap')">SNAP</button> -->
   </div>
</template>

<script>
export default {
   name: "Camera",
   mounted() {
      this.init()
   },
   methods: {
      async init() {
         const checkMedia =
            "mediaDevices" in navigator &&
            "getUserMedia" in navigator.mediaDevices

         if (checkMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({
               video: {
                  width: {
                     min: 640,
                     ideal: 1280,
                     max: 1920,
                  },
                  height: {
                     min: 360,
                     ideal: 720,
                     max: 1080,
                  },
               },
            })

            const videoPlayer = this.$refs.camera

            videoPlayer.srcObject = stream
            videoPlayer.play()
         } else {
            alert("Can't get mediaDevices")
         }
      },
   },
}
</script>

<style>
.camera {
   width: 100%;
   max-width: 640px;
}
</style>