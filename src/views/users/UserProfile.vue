<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit User Profil</strong>
      </CCardHeader>
      <CCardBody>
        <div
          class="alert-success text-center my-3 px-4 py-3"
          v-if="successUpdate"
        >
          {{ successUpdate }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoading"
        >
          <b-spinner
            variant="success"
            label="Spinning"
            class="mr-3"
          ></b-spinner>
          Loading ...
        </div>
        <form action="" enctype="multipart/form-data">
          <CInput
            description="Enter your first name"
            label="First Name"
            horizontal
            v-model="user.first_name"
          />
          <CInput
            description="Enter your last name"
            label="Last Name"
            horizontal
            v-model="user.last_name"
          />
          <CInput
            label="Phone"
            description="your phone number must be 10 caracters"
            placeholder="Enter your phone number"
            horizontal
            v-model="user.phone_number"
          />
          <CInput
            label="Email"
            description="Please enter your email"
            placeholder="Enter your email"
            type="email"
            horizontal
            autocomplete="email"
            v-model="user.email"
          />
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
        </form>
      </CCardBody>
      <CCardFooter>
        <CButton
          type="submit"
          size="sm"
          color="primary"
          class="mr-3"
          @click.prevent="updateUser"
        >
          <CIcon name="cil-check-circle" /> Submit</CButton
        >
        <CButton type="reset" size="sm" color="danger"
          ><CIcon name="cil-ban" /> Reset</CButton
        >
      </CCardFooter>
    </CCard>
  </CCol>
</template>

<script>
import axios from "axios";
export default {
  props: ["editedUser"],
  data() {
    return {
      password: "",
      isLoading: false,
      successUpdate: "",
      error: "",
      administrator_image: null,
    };
  },
  computed: {
    user() {
      return this.editedUser;
    },
    status() {
      return this.user.is_suspended === 0 ? false : true;
    },
  },
  methods: {
    uploadImage(e) {
      this.administrator_image = e.target.files[0];
      console.log(this.administrator_image);
    },
    updateUser() {
      this.isLoading = true;
      //this.checkUploadForm;

      const updatedAdmin = new FormData();

      updatedAdmin.append("first_name", this.user.first_name);
      updatedAdmin.append("last_name", this.user.last_name);
      updatedAdmin.append("email", this.user.email);
      updatedAdmin.append("password", this.password);
      updatedAdmin.append("phone_number", this.user.phone_number);
      updatedAdmin.append("administrator_image", this.administrator_image);
      updatedAdmin.append('_method', 'PUT'); 

      console.log(11111111);

      const id = this.user.id;

      const apiUpdateRoute = "http://localhost:8000/api/administrators/" + id;
      const config = { headers: { 'content-type': 'multipart/form-data' } };

      axios.post(apiUpdateRoute, updatedAdmin, config)
        .then((res) => {
          console.log("After Done Axios ==> update User");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
  },
};
</script>
