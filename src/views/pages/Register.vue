<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                >
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  v-model="email"
                  prepend="@"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  v-model="password"
                  autocomplete="new-password"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  v-model="repeatedPassword"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>
                <CButton color="success" block @click="register">Create Account</CButton>
                <template>
                  <div class="alert alert-success mt-3 text-center" v-if="success">
                    {{ success }}
                  </div>
                </template>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <CRow>
                <CCol col="6">
                  <CButton block color="facebook">
                    Facebook
                  </CButton>
                </CCol>
                <CCol col="6">
                  <CButton block color="twitter">
                    Twitter
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data(){
    return{
      email: '',
      password: '',
      repeatedPassword: '',
      first_name: 'Amiri',
      last_name: 'Mohamed',
      success: ''
    }
  },
  methods: {
    register(){
      axios.post('http://localhost:8000/api/auth/register',{
        email: this.email,
        password: this.password,
        first_name: this.first_name,
        last_name: this.last_name
      })
      .then(res => {
        //Afficher la data de la reponse
        console.log(res.data);
        this.success = 'user registred';
      })
      .then( err => {
        console.log(err.message);
      })
      console.log('perform Register');
    }
  }
}
</script>
