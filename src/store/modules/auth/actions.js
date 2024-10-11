let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
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

    const expiresIn = +responseData.expiresIn * 1000; // 3600sc * 1000
    // const expiresIn = 5000
    const expirationDate = new Date().getTime() + expiresIn;
    //access localStorage and store data in localstorage
    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    //Set timer whenever user is logged in, so the user log out when time expires
    timer = setTimeout(function() {
        context.dispatch('autoLogout');
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken, //from firebase auth
      userId: responseData.localId,
    });
  },
  //autologin
  //check whether data exists. if yes, we set a user, otherwise not.
  tryLogin(context) {
    //access the local storage and get the item
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    //get difference between the timestamp and the current time
    const expiresIn = +tokenExpiration - new Date().getTime();

    if(expiresIn < 0) { //if time is out, user cant login
        return; 
    } 

    //if time is still left , we set timer to logout
    timer = setTimeout(function () {
        context.dispatch('autoLogout');
    }, expiresIn);

    //check if there are token and userID, then commit set user and pass data on
    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId
      });
    }
  },
  logout(context) {
    //remove item in local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem('tokenExpiration'); //remove the token if logout automatically if token expired

    //logout manually , remove the timer
    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }

};
