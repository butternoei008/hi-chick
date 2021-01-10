<template>
   <div class="d-flex justify-content-center">
      <div class="card w-100" style="margin: 4rem; max-width: 600px">
         <div class="card-body">
            <FormCreateUser />
         </div>
      </div>
   </div>
</template>

<script>
import FormCreateUser from "../components/Forms/FormCreateUser"
import { mapState } from "vuex"

export default {
   name: "CreateUser",
   components: {
      FormCreateUser,
   },
   computed: {
      ...mapState,
   },
}
</script>