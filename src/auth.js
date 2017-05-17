import api from './api';

module.exports = {
  login(email, pass){
    if(localStorage.token){
      throw new Error('Already logged in')
    }
    else{
      return api.requestLogIn(email, pass)
      .then(res => localStorage.token = res.body.token)
    }
  },

  signup(signUpObj){
    console.log("auth.js", signUpObj);
    if(!signUpObj.email || !signUpObj.password){
      throw new Error('Please enter valid email or password')
    }
    else{
      return api.requestSignUp(signUpObj);
    }
  },

  getToken(){
    return localStorage.token
  },

  logout(){
    console.log(localStorage.token, "auth.logout!!!!");
    return api.requestLogOut(localStorage.token)
    .then(res => {
      delete localStorage.token
    })
    .catch(console.error);
  },

  isLoggedIn() {
    return !!localStorage.token
  },
}
