import axios from "axios";

// const devUrl = "https://localhost:5000";
const testUrl = "https://123.60.59.138:5000/";
axios.defaults.baseURL = testUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    console.log(error)
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    return response.data;
  },
  function(error) {
    console.log(error)
    return Promise.reject(error);
  }
);

export default axios;
