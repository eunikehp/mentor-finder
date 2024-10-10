export default {
  async login(context,payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqKX44iMM6ztnb4jXWwMJoS7_bf8z_0X8',{
        method: 'POST',
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        })
        
    });
    const responseData = await response.json();

    if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.') 
        throw error;
    }

    console.log(responseData);
    context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
    })
  },
  async signup(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqKX44iMM6ztnb4jXWwMJoS7_bf8z_0X8',{
        method: 'POST',
        body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        })
        
    });
    const responseData = await response.json();

    if(!response.ok) {
        const error = new Error(responseData.message || 'Failed to authenticate. Check your login data.') 
        throw error;
    }

    console.log(responseData);
    context.commit('setUser', {
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn
    })
  },

};

