export default {
    contactMentor(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            mentorId: payload.mentorId,
            userEmail : payload.email,
            message: payload.message,
        };
        //commit the mutation 
        context.commit('addRequest', newRequest); // (mutations name, new payload )
    }
}