import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
     // have a root state, to manage the ID of the user
     state(){
        return {
            userId: 'c3' //dummy ID
        }
    },
    getters,
    mutations,
    actions
}