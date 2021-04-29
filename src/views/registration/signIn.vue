<template>
  <div class="container">
    <div class="signInForm mx-auto mt-5">
        <div class="text-center title my-4">Sign In Form</div>
      <form @submit.prevent="loginPerform">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" v-model="password"/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <div class="alert-danger text-center mt-4 px-4 py-3" v-if="error">
            {{ error }}
        </div>

        <div class="d-flex justify-content-center px-4 py-3 mt-4" v-if="isLoading">
            <b-spinner variant="success" label="Spinning"></b-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          email: '',
          password: '',
          isLoading: false,
          error: ''
      }
  },
  methods: {
      loginPerform(){
          this.isLoading = true;
          this.$store.dispatch('loginPerform',{
              email: this.email,
              password: this.password
          })
          .then( res => {
              this.isLoading = false;
              this.$router.push('/dashboard');
          })
          .catch( error => {
              console.log(error);
              this.isLoading = false;
              this.error = "Error While Sign In, Try again";
          })
      }
  }
};
</script>

<style scoped>
.signInForm {
    max-width: 540px;
}
.title{
    font-weight: 600;
    font-size: 2rem;
}
</style>
