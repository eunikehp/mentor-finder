export default {
    mentors(state) {
        return state.mentors;
    },
    hasMentors(state) {
        return state.mentors && state.mentors.length > 0;
    },
    //getter: return true if the user already is mentor and false otherwise.
    //(state, getters, rootState, rootGetters)
    isMentor(_, getters, _2, rootGetters) { //specific convention that I have to take these arguments but deliberately not using them 
        const mentors = getters.mentors;
        const userId = rootGetters.userId;
        return mentors.some(mentor => mentor.id === userId) //some = built-in method return true if some mentors fulfill a criteria
    }
};
