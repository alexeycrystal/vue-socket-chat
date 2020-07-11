<template>
  <div>
    <ValidationObserver ref="photoChangeForm" v-slot="{valid, handleSubmit }">
      <form enctype="multipart/form-data"
            @submit.prevent="handleSubmit(changeProfilePhoto)">
        <p>
          <ValidationProvider immediate
            name="Image"
            rules="image"
            v-slot="{ errors, validate  }">
            <label for="file-input">Email:</label>
            <input id="file-input"
                   ref="profilePhoto"
                   name="photo-file-input"
                   type="file"
                   data-vv-as="image"
                   @change="validate(); refreshCurrentFile()"
                   placeholder="Select your new photo"
                   >
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </p>
        <p>
          <button type="submit" :disabled="!valid">Submit</button>
        </p>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>

  import {ValidationObserver, ValidationProvider} from 'vee-validate';

  export default {
    name: "ProfilePhotoChange",
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data() {
      return {
        initialState: true,
        file: null,
      }
    },
    methods: {
      refreshCurrentFile() {

        if(this.$refs.profilePhoto.files)
          this.file = this.$refs.profilePhoto.files[0];
      },
      changeProfilePhoto() {

        this.$store
          .dispatch("user/saveNewProfilePhoto", this.file);

        this.$modal.hide('search-contacts-modal');
      },
    }
  }
</script>

<style scoped>

</style>
