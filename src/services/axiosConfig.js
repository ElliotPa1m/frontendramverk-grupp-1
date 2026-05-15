import axios from 'axios';

/*----------------------------------------------/ 
/ Axios config with error handling(logging) and /
/ a callDelay for every new API call after the  /
/ first call                                    /
/----------------------------------------------*/

const MIN_CALL_DELAY_MS = 5000; // 5 seconds call delay
let lastCallTime = 0;

const callDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
// Temporary comment to explain the callDelay line:
// SetTimeout(resolve, ms) is the browsers build in timer function. it takes a callback and time (in ms) as arguments. the callback is called after the set time.
// new Promise(resolve =>...) creates a Promise. To signal a Promise is done you call its resolve function. Since we pass the resolve function as the callback in the setTimeout it fires off and "clears" the promise after the set ms-time (which we calculate and send as an arg in the interceptor)
// ** There are probably more elgant ways to add the delay, and maybe it should be more flexible, for now, it hopefully helps us limit some of our limited, precious API calls should something go sideways.

const apiClient = axios.create({
  baseURL: 'https://recipeapi.io/api/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

apiClient.interceptors.request.use(
  async config => {
    const now = Date.now();
    const elapsed = now - lastCallTime;

    if (lastCallTime && elapsed < MIN_CALL_DELAY_MS) {
      await callDelay(MIN_CALL_DELAY_MS - elapsed);
    }

    lastCallTime = Date.now();
    return config;
  },
  error => {
    // Something went wrong setting up the request
    console.error('Request setup error:', error.message);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => response, // just passes through a succesful response for now (2xx)

  error => {
    if (error.response) {
      // Server responds but with a non-2xx status code
      console.log('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no server response
      console.error('No response received:', error.request);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
