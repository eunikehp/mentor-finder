// to
export default {
    requests(state) {
        return state.requests;
    },
    hasRequests(state) {
        return state.requests && state.requests.length > 0;
    },
    // to show requests on specific mentor
    requestsForMentor(state, _, _2, rootGetters) {
        const mentorId = rootGetters.userId;
        console.log(state.requests)
        return state.requests.filter(req => req.mentorId === mentorId); //mentorId from contactMentor page
    },
    // not check all request in our state, instead use getters.
    // getter: return true if the user already is mentor and false otherwise.
    mentorHasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0;
    }
    

}