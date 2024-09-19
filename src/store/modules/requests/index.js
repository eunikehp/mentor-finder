// where we merge all the requests related mutations,getters,dll

import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state() { //manage requests
        return {
            requests: []
        };
    },
    mutations,
    actions,
    getters,
}