import state from "./state";

const getters = {

/**
 *     Users Section
 */
    /**
     *      Get Users From Globale State
     */

    getUsers(state){
      return state.users;
    },
    getUserById2: (state) => (id) => {
      console.log('the User ');
      const actifUser = state.users.find(user => user.id == id);
      console.log(actifUser);
      return actifUser;
    },
    getActifAdministrator(state){
      return state.administrator;
    },

/**
 *     Clients Section
 */
    /**
     *      Get Clients From Globale State
     */
    getClients(state){
        return state.clients;
    },
    getClientById: (state) => (id) => {
      console.log('the Client ');
      return state.clients.find(client => client.id == id);
    },

    /**
 *     Candidates Section
 */
    /**
     *      Get Candidates From Globale State
     */
     getCandidates(state){
      return state.candidates;
  },
  getCandidateById: (state) => (id) => {
    console.log('the Candidate ');
    return state.candidates.find(candidate => candidate.id == id);
  }
  }

  
export default getters;