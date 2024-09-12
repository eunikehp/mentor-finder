// where we merge all the mentors related mutations,getters,dll

import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
    namespaced: true,
    state() {
        return {
            mentors: [
                {
                  id: 'm1',
                  firstName: 'Tom',
                  lastName: 'Hanks',
                  areas: ['frontend', 'backend', 'career'],
                  description:
                    "I'm Tom and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                  hourlyRate: 30
                },
                {
                  id: 'm2',
                  firstName: 'Julie',
                  lastName: 'Roberts',
                  areas: ['frontend', 'career'],
                  description:
                    'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                  hourlyRate: 30
                }
              ]
        };
    },
    mutations,
    actions,
    getters,
}