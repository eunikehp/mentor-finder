import { createStore } from "vuex";

import mentorsModule from './modules/mentors/index';

const store = createStore({
    //register the mentors module
    modules: {
        mentors: mentorsModule,
    },
    // have a root state, to manage the ID of the user
    state(){
        return {
            userId: 'c3' //dummy ID
        }
    },
    //rootGetters
    getters: {
        userId(state) {
            return state.userId;
        }
    }
})

export default store;