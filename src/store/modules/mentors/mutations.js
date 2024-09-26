export default {
    addMentor(state,payload) {
        state.mentors.push(payload);
    },
    // fetching mentor data from firebase
    setMentors(state, payload){
        state.mentors = payload; //// set mentor state = payload --> a list of mentors
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    }

};