export default {
    //store all data in vuex
    setUser(state, payload) {
        state.token = payload.token,
        state.userId = payload.userId,
        state.tokenExpiration = payload.tokenExpiration;
    }
}