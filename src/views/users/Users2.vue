<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header"><b>Users</b></div>
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
          id="users-table"
          :items="users"
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
              @click="showUser(row.item.id)"
              class="mr-2"
              >Show</b-button
            >

            <b-button
              size="sm"
              variant="danger mr-2"
              @click="deleteUser(row.item.id)"
              >Delete</b-button
            >
          </template>
          <!-- Suspend Button -->
          <template class="text-center" #cell(status)="row">
            <b-button
              v-if="row.item.is_suspended"
              size="sm"
              variant="warning mr-2"
              @click="suspendUser(row.item)"
              >Suspend</b-button
            >
            <b-button
              v-if="!row.item.is_suspended"
              size="sm"
              variant="success mr-2"
              @click="activateUser(row.item)"
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
          aria-controls="users-table"
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
  name: "Users2",
  data() {
    return {
      fields: [
        { key: "first_name", label: "First name" },
        { key: "last_name", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone_number", label: "Phone number" },
        { key: "actions", label: "Actions" },
        { key: "status", label: "Status" },
      ],
      errors: [],
      loadingStatus: false,
      error: "",
      currentPage: 1,
      perPage: 5,
      isLoading: false,
      isLoadingData: false,
    };
  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    rows() {
      return this.users.length;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.currentPage = Number(route.query.page);
        }
      },
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    loadUsers() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadUsers")
        .then((result) => {
          this.isLoadingData = false;
        })
        .catch((error) => {
          this.isLoadingData = false;
          console.log(error.message);
          this.error = "There was an error while bringing data";
        });
    },
    deleteUser(id) {
      this.$store
        .dispatch("deleteUser", id)
        .then((res) => {
          this.success = "User's deleted successfully !!!";
          console.log("User's deleted successfully !!!");
          this.loadClients();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    showUser(id) {
      this.$router.push({ path: `users/${id}` });
    },
    suspendUser(item) {
      this.isLoading = true;
      const id = item.id;
      const suspendedUser = {
        is_suspended: 0,
      };
      const apiUpdateRoute = "http://localhost:8000/api/administrators/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, suspendedUser, config)
        .then((res) => {
          console.log("After Done Axios ==> suspend Client");
          this.isLoading = false;
          this.success = "The suspended succeded";
          this.loadUsers();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
    activateUser(item) {
      this.isLoading = true;
      const activatedUser = {
        is_suspended: 1,
      };
      const id = item.id;
      const apiUpdateRoute = "http://localhost:8000/api/administrators/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, activatedUser, config)
        .then((res) => {
          console.log("After Done Axios ==> activated User");
          this.isLoading = false;
          this.success = "The activated succeded";
          this.loadUsers();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
  },
  created() {
    this.loadUsers();
  },
};
</script>

<style scoped>
tbody tr td {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
</style>
