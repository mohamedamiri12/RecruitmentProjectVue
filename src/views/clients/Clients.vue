<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header"><b>Clients</b></div>
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
          id="clients-table"
          :items="clients"
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
              @click="showClient(row.item.id)"
              class="mr-2"
              >Show</b-button
            >

            <b-button
              size="sm"
              variant="danger mr-2"
              @click="deleteClient(row.item.id)"
              >Delete</b-button
            >
          </template>
          <!-- Suspend Button -->
          <template class="text-center" #cell(status)="row">
            <b-button
              v-if="row.item.is_suspended"
              size="sm"
              variant="warning mr-2"
              @click="suspendClient(row.item)"
              >Suspend</b-button
            >
            <b-button
              v-if="!row.item.is_suspended"
              size="sm"
              variant="success mr-2"
              @click="activateClient(row.item)"
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
          aria-controls="clients-table"
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
  name: "Users",
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
    clients() {
      return this.$store.getters.getClients;
    },
    rows() {
      return this.clients.length;
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
    showClient(id) {
      this.$router.push({ path: `clients/${id}` });
    },
    loadClients() {
      this.isLoadingData = true;
      this.$store
        .dispatch("loadClients")
        .then((result) => {
          this.isLoadingData = false;
        })
        .catch((error) => {
          this.isLoadingData = false;
        });
    },
    loadClientsAfterUpdate() {
      this.$store
        .dispatch("loadClients")
        .then((result) => {})
        .catch((error) => {});
    },
    deleteClient(id) {
      this.$store
        .dispatch("deleteClient", id)
        .then((res) => {
          this.success = "CLient's deleted successfully !!!";
          console.log("CLient's deleted successfully !!!");
          this.loadClients();
        })
        .catch((error) => {
          console.log(error.message);
          this.error = "The delete process failed";
        });
    },
    suspendClient(item) {
      this.isLoading = true;
      const id = item.id;
      const suspendedClient = {
        is_suspended: 0,
      };
      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/clients/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, suspendedClient, config)
        .then((res) => {
          console.log("After Done Axios ==> suspend Client");
          this.isLoading = false;
          this.success = "The suspended succeded";
          this.loadClientsAfterUpdate();
        })
        .catch((error) => {
          console.log(error.response.data);
          this.isLoading = false;
          this.error = "Something wrong, Please try again";
        });
    },
    activateClient(item) {
      this.isLoading = true;
      const activatedClient = {
        is_suspended: 1,
      };
      const id = item.id;
      const apiUpdateRoute =
        "http://localhost:8000/api/administrator/clients/" + id;
      const config = { headers: { "Content-Type": "application/json" } };

      axios
        .put(apiUpdateRoute, activatedClient, config)
        .then((res) => {
          console.log("After Done Axios ==> activated Client");
          this.isLoading = false;
          this.success = "The activated succeded";
          this.loadClientsAfterUpdate();
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
    this.loadClients();
  },
};
</script>

<style scoped>
.table-thead div table thead {
  background-color: #212529;
  color: #fff;
}
</style>
