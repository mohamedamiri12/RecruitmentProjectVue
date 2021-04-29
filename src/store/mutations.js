const mutations = {
    toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set (state, [variable, value]) {
    state[variable] = value
    },

/**
 *      Users Mutations Section : 
 */    

    /**
     *      Set Comming Users From Api To State
     */

    SAVE_USERS(state, payload){
        state.users=payload;
    },

    /**
     *      Change The User Spinner Status
     */

    UPDATE_USER_SPINNER(state, payload){
        state.userSpinner = payload;
    },

    setUsers(state,payload){
        console.log(payload);
        state.users.push(payload.users);
        console.log(state.users);
    },
    getUserById(state,payload){
        let useer = (state.users).find((user) =>{
            user.id == payload
        });
        return useer;
    },
    SET_TOKEN_ACCESS(state,payload){
        state.access_token = payload
    },
    SET_USER_LOGGED_STATUS(state,payload){
        state.isUserLogged = payload;
    },

/**
 *      Clients Mutations Section : 
 */    

    /**
     *      Set Comming Clients From Api To State
     */

     SAVE_CLIENTS(state, payload){
        state.clients = payload;
    },

    /**
 *      Candidates Mutations Section : 
 */    

    /**
     *      Set Comming Candidates From Api To State
     */

     SAVE_CANDIDATES(state, payload){
        state.candidates = payload;
    },

/**
 *      Registration Mutations Section : 
 */    

    /**
     *      Set Actif Administrator to State
     */
    SET_ACTIF_ADMINISTRATOR(state,payload){
        state.administrator = payload;
    }
}


export default mutations;

