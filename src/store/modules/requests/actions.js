export default {
    async contactMentor(context, payload) {
        const newRequest = {
            // id: new Date().toISOString(), // firebase will generate the id
            // mentorId: payload.mentorId,
            userEmail : payload.email,
            message: payload.message,
        };

        //send the HTTP Request to Firebase
        const response = await fetch(`https://react-mentor-finder-default-rtdb.firebaseio.com/requests/${payload.mentorId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });

        //awaiting data
        const responseData = await response.json(); 

        console.log(responseData);

        if (!response.ok) { //check if response is ok
            const error = new Error(responseData.message || 'Failed to send request')
            throw error;
        }

        //use id on the Vue app locally
        newRequest.id = responseData.name; //this generates id
        newRequest.mentorId = payload.mentorId;

        //commit the mutation 
        context.commit('addRequest', newRequest); // (mutations name, new payload )
    },
    //load all the requests for the currently active user
    async fetchRequests(context) {
        const mentorId = context.rootGetters.userId;
        const token = context.rootGetters.token;

        console.log(mentorId);
        const response = await fetch(`https://react-mentor-finder-default-rtdb.firebaseio.com/requests/${mentorId}.json?auth=` + token);
        const responseData = await response.json();

        console.log(responseData);
        if (!response.ok) {
            //set error message
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        //transform data we loaded
        const requests = [];

        for(const key in responseData) { //get each mentorID as a key
            //construct a new request object
            const request = {
                id: key,
                mentorId: mentorId,
                userEmail: responseData[key].userEmail, //to understand this, check structure data in the firebase
                message: responseData[key].message,
            };

            requests.push(request);
        }

        //commit the mutations to change the state in the Vuex store
        context.commit('setRequests', requests);
    }
}