<template>
  <div class="container">
    <div class="signUp mx-auto mt-5">
      <h1 class="text-center title my-4">registration form</h1>
      <form @submit.prevent="registrationPerform" enctype="multipart/form-data">
        <div class="form-group">
          <!-- first name -->
          <label for="firstName">First name</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="firstName"
            aria-describedby="emailHelp"
          />
          <!-- last name -->
          <label for="lastName">Last name</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="lastName"
            aria-describedby="emailHelp"
          />
          <!-- email -->
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            aria-describedby="emailHelp"
          />
        </div>
        <!-- password -->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
        <!-- phone number -->
        <div>
          <label for="phoneNumber">Phone number</label>
          <input
            type="number"
            class="form-control"
            id="phoneNumber"
            v-model="phoneNumber"
            aria-describedby="emailHelp"
          />
        </div>
        <!-- Upload File -->
        <p class="mt-3 mb-2">Administrator Image</p>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            id="validatedCustomFile"
            required
            accept="image/*"
            @change="uploadImage"
          />
          <label class="custom-file-label" for="validatedCustomFile"
            >Choose file...</label
          >
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
        <div class="alert-danger text-center mt-4 px-4 py-3" v-if="error">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 mt-4"
          v-if="isLoading"
        >
          <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      isLoading: false,
      error: "",
      administrator_image: null
    };
  },
  methods: {
    registrationPerform() {
      this.isLoading = true;
      const formData = new FormData();

      formData.append("first_name",this.firstName);
      formData.append("last_name",this.lastName);
      formData.append("email",this.email);
      formData.append("password",this.password);
      formData.append("phone_number",this.phoneNumber);
      formData.append("administrator_image",this.administrator_image);
      
      console.log(this.administrator_image);

      this.$store.dispatch("registrationPerform", formData)
        .then((res) => {
          this.isLoading = false;
          console.log("Registration Done");
          console.log(res.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
          this.error = "Registration Failed";
        });
    },
    uploadImage(e){
      this.administrator_image = e.target.files[0];
    }
  },
};
</script>

<style scoped>
.signUp {
  max-width: 540px;
}
.title {
  font-weight: 600;
  font-size: 2rem;
}
</style>
