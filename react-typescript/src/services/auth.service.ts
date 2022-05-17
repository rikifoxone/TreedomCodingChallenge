import axios from "axios";

const  AUTH_API_URL  = process.env.REACT_APP_AUTH_API_URL;


class AuthService {
  login(email: string, password: string) {
    return axios
      .post(AUTH_API_URL + "login", {
        email,
        password
      })
      .then(response => {
        console.log('response.data',response.data)
        // if (response.data.accessToken) {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name: string, email: string, password: string) {
    return axios.post(AUTH_API_URL + "register", {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
