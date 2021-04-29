<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header"><b>Candidates</b></div>
      <div class="card-body">
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
        <!-- Users Table -->
        <b-table
          head-variant="dark"
          hover
          striped
          id="candidates-table"
          :items="candidates"
          :fields="fields"
          :per-page="perPage"
          :total-rows="rows"
          :current-page="currentPage"
          class="text-center"
        >
          <!-- Actions Button -->
          <template #cell(actions)="row">
            <b-button
              size="sm"
              variant="primary mr-2"
              @click="showCandidate(row.item.id)"
              class="mr-2"
              >Show</b-button
            >

            <b-button
              size="sm"
              variant="danger mr-2"
              @click="deleteCandidate(row.item.id)"
              >Delete</b-button
            >
          </template>
          <!-- Suspend Button -->
          <template class="text-center" #cell(status)="row">
            <b-button
              v-if="row.item.is_suspended"
              size="sm"
              variant="warning mr-2"
              @click="suspendCandidate(row.item)"
              >Suspend</b-button
            >
            <b-button
              v-if="!row.item.is_suspended"
              size="sm"
              variant="success mr-2"
              @click="activateCandidate(row.item)"
              >Activate</b-button
            >
          </template>
        </b-table>
      </div>
      <!-- Loading Data Spinner -->
      <div
        class="d-flex justify-content-center px-4 py-3 my-3"
        v-if="isLoadingData"
      >
        <b-spinner variant="primary" label="Spinning" class="mr-3"></b-spinner>
        Loading ...
      </div>
      <div class="card-footer text-muted w-100">
        <b-pagination
          class="d-flex justify-content-center mt-2 mb-1"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="candidates-table"
          first-text="⏮"
          prev-text="⏪"
          next-text="⏩"
          last-text="⏭"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Candidates",
  data() {
    return {
      showModalStatus: false,
      fields: [
        { key: "first_name", label: "First name" },
        { key: "last_name", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone_number", label: "Phone number" },
        { key: "actions", label: "Actions" },
        { key: "status", label: "Status" },
      ],
      isLoading: false,
      currentPage: 1,
      activePage: 1,
      error: "",
      success: "",
      perPage: 5,
      numberOfItems: 0,
      headVariant: "dark",
      isLoadingData: false,
    };
  },
  computed: {
    candidates() {
      return this.$store.getters.getCandidates;
    },
    rows() {
      return this.candidates.length;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    showCandidate(id) {
      this.$router.push({ path: `candidates/${id}` });
    },
    loadCandidates() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadCandidates")
        .then((result) => {
          this.isLoadingData = false;
        })
        .catch((error) => {
          this.isLoadingData = false;
        });
    },
    loadCandidatesAfterUpdate() {
      this.$store
        .dispatch("loadCandidates")
        .then((result) => {})
        .catch((error) => {});
    },
    deleteCandidate(id) {
      this.$store
        .dispatch("deleteCandidate", id)
        .then((res) => {
          this.success = "Candidate's deleted successfully !!!";
          console.log("Candidate's deleted successfully !!!");
          this.loadCandidates();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    suspendCandidate(item) {
      this.isLoading = true;
      const id = item.id;
      const suspendedCandidate = {
        is_suspended: 0,
      };
      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/candidates/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, suspendedCandidate, config)
        .then((res) => {
          console.log("After Done Axios ==> suspend Candidate");
          this.isLoading = false;
          this.success = "The suspended succeded";
          this.loadCandidatesAfterUpdate();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
    activateCandidate(item) {
      this.isLoading = true;
      const activatedCandidate = {
        is_suspended: 1,
      };
      const id = item.id;
      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/candidates/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, activatedCandidate, config)
        .then((res) => {
          console.log("After Done Axios ==> activated Candidate");
          this.isLoading = false;
          this.success = "The activated succeded";
          this.loadCandidatesAfterUpdate();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
    showModal(status) {
      console.log(status);
      this.showModalStatus = status;
    },
  },
  created() {
    this.loadCandidates();
  },
};
</script>

<style scoped>
.table-thead div table thead {
  background-color: #212529;
  color: #fff;
}
</style>
