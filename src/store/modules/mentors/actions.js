//because keyname of database doesnt align with keynames of emitted data, so use actions to transform the data
export default {
    addMentor(context, data){
        const mentorData = {
            id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        context.commit('addMentor', mentorData);
    }
};
