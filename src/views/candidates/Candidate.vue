<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header"><b>Candidate id : {{ candidate.id }}</b></div>
        <div class="card-body">
          <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">first_name</th>
                <td>{{ candidate.first_name }}</td>
              </tr>
              <tr>
                <th scope="col">last_name</th>
                <td>{{ candidate.last_name }}</td>
              </tr>
              <tr>
                <th scope="col">email</th>
                <td>{{ candidate.email }}</td>
              </tr>
              <tr>
                <th scope="col">Phone Number</th>
                <td>{{ candidate.phone_number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted">
          <button class="btn btn-primary float-left" @click="goBack">
            Back
          </button>
          <button class="btn btn-warning float-right" @click="showUpdateForm">
            Edit
          </button>
        </div>
      </div>
    </CCol>
    <CCol col="12" lg="6">
      <router-view :editedCandidate="candidate"></router-view>
    </CCol>
  </CRow>
</template>

<script>
import BaseCard from "../users/BaseCard.vue";
export default {
  name: "CAndidate",
  components: {
    BaseCard,
  },
  data() {
    return {
      usersOpened: null,
    };
  },
  computed: {
    candidate() {
      const id = parseInt(this.$route.params.id);
      console.log("id === " + id);
      return this.$store.getters.getCandidateById(id);
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/candidates" });
    },
    showUpdateForm() {
      const id = this.$route.params.id;
      this.$router.push({ path: "/dash/candidates/" + id + "/edit" });
    },
  },
};
</script>
