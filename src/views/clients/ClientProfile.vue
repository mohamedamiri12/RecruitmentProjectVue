<template>
  <CCol md="12">
    <CCard>
      <CCardHeader>
        <strong>Edit CLient Profil</strong>
      </CCardHeader>
      <CCardBody>
        <div
          class="alert-success text-center my-3 px-4 py-3"
          v-if="successUpdate && countDown > 0"
        >
          {{ successUpdate }}
        </div>
        <div class="alert-danger text-center my-3 px-4 py-3" v-if="error && countDown > 0">
          {{ error }}
        </div>

        <div
          class="d-flex justify-content-center px-4 py-3 my-3"
          v-if="isLoading"
        >
          <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
        <form action="" enctype="multipart/form-data">
          <CInput
            description="Enter your first name"
            label="First Name"
            horizontal
            v-model="client.first_name"
          />
          <CInput
            description="Enter your last name"
            label="Last Name"
            horizontal
            v-model="client.last_name"
          />
          <CInput
            label="Phone"
            description="your phone number must be 10 caracters"
            placeholder="Enter your phone number"
            horizontal
            v-model="client.phone_number"
          />
          <CInput
            label="Email"
            description="Please enter your email"
            placeholder="Enter your email"
            type="email"
            horizontal
            autocomplete="email"
            v-model="client.email"
          />
          <!-- Upload File -->
          <p class="mt-3 mb-2">Client Image</p>
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
          @click="updateClient"
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
  props: ["editedClient"],
  data() {
    return {
      /*firstName: this.editedClient.first_name,
      lastName: this.client.last_name,
      email: this.client.email,
      password: this.client.password,
      phoneNumber: this.client.phoneNumber,
      status: this.client.status,*/
      password: "",
      isLoading: false,
      successUpdate: "",
      error: "",
      client_image: null,
      countDown: 5,
    };
  },
  computed: {
    client() {
      return this.editedClient;
    },
    status() {
      return this.client.is_suspended === 0 ? false : true;
    },
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    uploadImage(e) {
      this.client_image = e.target.files[0];
      console.log(this.client_image);
    },
    updateClient() {
      this.isLoading = true;

      const updatedCLient = new FormData();

      updatedCLient.append("first_name", this.client.first_name);
      updatedCLient.append("last_name", this.client.last_name);
      updatedCLient.append("email", this.client.email);
      updatedCLient.append("password", this.client);
      updatedCLient.append("phone_number", this.client.phone_number);
      updatedCLient.append("client_image", this.client_image);
      updatedCLient.append("_method", "PUT");

      const id = this.client.id;

      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/clients/" + id;
      const config = { headers: { "content-type": "multipart/form-data" } };

      axios
        .post(apiUpdateRoute, updatedCLient, config)
        .then((res) => {
          console.log("After Done Axios ==> update Client");
          this.isLoading = false;
          this.successUpdate = "The update succeded";
          this.countDownTimer();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
          this.countDownTimer();
        });
    },
  },
};
</script>
