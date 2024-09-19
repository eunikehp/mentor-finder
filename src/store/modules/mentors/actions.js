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

        // send the request to server, tells the firebase, data will be overwritten if it existed or created if didn't exist
        const response = await fetch(`https://react-mentor-finder-default-rtdb.firebaseio.com/mentors/${userId}.json`, {
            method: 'PUT' ,
            body: JSON.stringify(mentorData) //convert object into JSON format //sends a put request to this URL with this data
        });

        // const responseData = await response.json();
        
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
    }
};


// POST = a new entry would be added all the time
// PUT = data will be overwritten if it exists , if not it would be created