export default {
    userId(state) { //rootGetters
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token; //since token=null, !!state.token = true
    },
    didAutoLogout(state){
        return state.didAutoLogout;
    }
}