export default {
  async login(context, payload) {
    return context.dispatch('auth', {
        ...payload,
        mode: 'login'
    })
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
        ...payload,
        mode: 'signup'
    })
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqKX44iMM6ztnb4jXWwMJoS7_bf8z_0X8";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqKX44iMM6ztnb4jXWwMJoS7_bf8z_0X8";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    //access localStorage and store data in localstorage
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);


    context.commit("setUser", {
      token: responseData.idToken, //from firebase auth
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  //autologin 
  //check whether data exists. if yes, we set a user, otherwise not.
  tryLogin(context) {
    //access the local storage and get the item
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    //check if there are token and userID, then commit set user and pass data on 
    if (token && userId) {
        context.commit('setUser', {
            token: token,
            userId: userId,
            tokenExpiration: null
        })
    }
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
