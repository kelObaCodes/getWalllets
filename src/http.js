import axios from "axios";


const httpClient = axios.create({

  baseURL: "https://api-staging.getwallets.co/",
  
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },

});

let token = 'sk_live_615d856adfdf251803d6a3ff615d856adfdf251803d6a400'


httpClient.interceptors.request.use(
  (config) => {
    config.headers.authorization = "Bearer " + token;
    return config;
  },

  (error) => {}
);

httpClient.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },

  function(error) {
 
    return Promise.reject(error);
  }
);

export default httpClient;