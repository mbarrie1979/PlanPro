// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    const decoded = decode(this.getToken());
    // console.log(decoded)
    return decoded
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isAdmin(){
    const token = this.getToken();
    if (token){
      const decoded = decode(token);
      console.log("Decoded token: " + JSON.stringify(decoded));
      if (decoded.data.isAdmin){
        return true;
      } 
    }
    return false;
  }
  
  getLoggedInUserId(){
    const token = this.getToken();
    if (token){
      const decoded = decode(token);
      console.log("Decoded token: " + JSON.stringify(decoded));
      return decoded.data._id
    }
    return 'NOT LOGGED IN';
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // console.log("Decoded token: " + decoded);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('saved_sessions');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
