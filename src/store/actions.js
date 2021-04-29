import axios from "axios";
import state from "./state";

const actions = {
  /**
   *      Users Section
   */
  setUsers(context, payload) {
    context.commit("setUsers", payload);
  },
  getUserById(context, payload) {
    context.commit("getUserById", payload);
  },

  /**
   *  Load Users From Api
   */
  loadUsers(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/administrators")
        .then((result) => {
          context.commit("SAVE_USERS", result.data);
          resolve(result);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },
  /**
   *      Clients Section
   */

  /**
   *  Load actions From Api
   */
  loadClients(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/administrator/clients")
        .then((result) => {
          resolve(result);  
          context.commit("SAVE_CLIENTS", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Client and Update Local State
   */
  deleteClient(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before Axios");
      console.log(payload);
      console.log("http://localhost:8000/api/administrator/clients/" + payload);
      axios
        .delete("http://localhost:8000/api/administrator/clients/" + payload)
        .then((res) => {
          console.log("After delete Done Axios");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *      Candidates Section
   */

  /**
   *  Load actions From Api
   */
   loadCandidates(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("http://localhost:8000/api/administrator/candidates")
        .then((result) => {
          resolve(result);  
          context.commit("SAVE_CANDIDATES", result.data);
        })
        .catch((error) => {
          reject(error);
          console.log(error.message);
        });
    });
  },
  /**
   *  DElete Candidate and Update Local State
   */
  deleteCandidate(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before Axios");
      console.log(payload);
      console.log("http://localhost:8000/api/administrator/candidates/" + payload);
      axios
        .delete("http://localhost:8000/api/administrator/candidates/" + payload)
        .then((res) => {
          console.log("After delete Done Axios");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *      Registration Section
   */

  /**
   *  Sign In Action
   */

  loginPerform(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before Axios");
      axios
        .post("http://localhost:8000/api/auth/login", payload)
        .then((res) => {
          console.log("After DOne Axios");
          context.commit("SET_ACTIF_ADMINISTRATOR", res.data.administrator);
          context.commit("SET_TOKEN_ACCESS", res.data.access_token);
          context.commit("SET_USER_LOGGED_STATUS", true);
          localStorage.setItem("token", res.data.access_token);
          localStorage.setItem("admin", JSON.stringify(res.data.administrator));
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },

  /**
   *  REgistration Action
   */
  registrationPerform(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before Axios");
      axios
        .post("http://localhost:8000/api/auth/register", payload)
        .then((res) => {
          console.log("After Done Axios");
          console.log(res.data);
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
  /**
   *  LogOut Action
   */

  logoutPerform(context, payload) {
    return new Promise((resolve, reject) => {
      console.log("Before Axios");
      axios
        .post("http://localhost:8000/api/auth/logout", {
          token: state.access_token,
        })
        .then((res) => {
          console.log("After Done Logout Axios");
          context.commit("SET_ACTIF_ADMINISTRATOR", null);
          context.commit("SET_TOKEN_ACCESS", null);
          context.commit("SET_USER_LOGGED_STATUS", false);
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          resolve(res);
        })
        .catch((error) => {
          console.log(error.response.data);
          reject(error);
        });
    });
  },
};

export default actions;
