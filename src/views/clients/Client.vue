<template>
  <CRow>
    <CCol col="12" lg="6">
      <div class="card">
        <div class="card-header"><b>Client id : {{ client.id }}</b></div>
        <div class="card-body">
          <table class="table table-striped table-fixed text-center">
            <tbody>
              <tr>
                <th scope="col">first_name</th>
                <td>{{ client.first_name }}</td>
              </tr>
              <tr>
                <th scope="col">last_name</th>
                <td>{{ client.last_name }}</td>
              </tr>
              <tr>
                <th scope="col">email</th>
                <td>{{ client.email }}</td>
              </tr>
              <tr>
                <th scope="col">Phone Number</th>
                <td>{{ client.phone_number }}</td>
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
      <router-view :editedClient="client"></router-view>
    </CCol>
  </CRow>
</template>

<script>
import BaseCard from "../users/BaseCard.vue";
export default {
  name: "CLient",
  components: {
    BaseCard,
  },
  data() {
    return {
      usersOpened: null,
    };
  },
  computed: {
    client() {
      const id = parseInt(this.$route.params.id);
      console.log("id === " + id);
      return this.$store.getters.getClientById(id);
    },
  },
  methods: {
    goBack() {
      this.usersOpened
        ? this.$router.go(-1)
        : this.$router.push({ path: "/dash/clients" });
    },
    showUpdateForm() {
      const id = this.$route.params.id;
      this.$router.push({ path: "/dash/clients/" + id + "/edit" });
    },
  },
};
</script>
