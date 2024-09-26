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
    },
    shouldUpdate(state){
        const lastFetch = state.lastFetch;
        if (!lastFetch){ //if it is null , we should update
            return true;
        }
        const currentTimeStamp = new Date().getTime(); //a timestamp (in milliseconds) when we do getter
        return (currentTimeStamp - lastFetch) / 1000 > 60; //compare current with storage timestamp, 
        // return true if it is more than a minute ago, so we should update. if it less a minute ago, return false so we shouldnt update
    }
};
