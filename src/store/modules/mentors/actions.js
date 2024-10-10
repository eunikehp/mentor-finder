//because keyname of database doesnt align with keynames of emitted data, so use actions to transform the data
export default {
    async addMentor(context, data){
        //store ID in a separate constant userId
        const userId = context.rootGetters.userId;
        const mentorData = {
            // id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };

        const token = context.rootGetters.token; //use rootGetters because we access it from root store, not in this module

        // send the request to server, tells the firebase, data will be overwritten if it existed or created if didn't exist
        const response = await fetch(`https://react-mentor-finder-default-rtdb.firebaseio.com/mentors/${userId}.json?auth=` + token, {
            method: 'PUT' ,
            body: JSON.stringify(mentorData) //convert object into JSON format //sends a put request to this URL with this data
        });

        // const responseData = await response.json(); //
        
        //check if the response is ok
        if(!response.ok) {
            //error
        }

        //commit data by copying mentorData with spread operator (take all key value pairs in mentorData)
        // and merge them into a new object. add ID field, which holds the userId
        context.commit('addMentor', { 
            ...mentorData,
            id: userId
        });
    },

    // send request to load/get the mentors from firebase
    // this action will be dispatched from any component that wants to trigger this loading process.
    async loadMentors (context, payload) {

        // check if we should update , if not true, the rest code wont executed
        // payload.forceRefresh to tell we need to refresh or not
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        
        const response = await fetch(`https://react-mentor-finder-default-rtdb.firebaseio.com/mentors.json`);
        const responseData = await response.json();

        if (!response.ok) {
            //set error message
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        //transform data we loaded
        const mentors = [];

        for(const key in responseData) { //get each mentorID as a key
            //cunstruct a new mentor object
            const mentor = {
                id: key,
                firstName: responseData[key].firstName, //to understand this, check structure data in the firebase
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };

            mentors.push(mentor);
        }

        //commit the mutations to change the state in the Vuex store
        context.commit('setMentors', mentors);
        context.commit('setFetchTimestamp');
    }
};


// POST = a new entry would be added all the time
// PUT = data will be overwritten if it exists , if not it would be created