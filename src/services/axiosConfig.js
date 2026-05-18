import axios from 'axios';
import rateLimit from 'axios-rate-limit';

/*----------------------------------------------/ 
/ Axios config with error handling (logging)    /
/ and dynamic rate limiting to protect the API  /
/----------------------------------------------*/

// Raw client
const rawClient = axios.create({
  baseURL: 'https://recipeapi.io/api/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout (Let's stick to this! I'm thinking 0-3 seconds can show a normal spinner, 3-10 seconds can show a UX message like "Still fetching, our recipe server might be taking a quick nap..." and 10+ seconds shows the actual network error message!)
});

// Wrap it in the rate limiter! Current config: max 2 requests per 1 second
const apiClient = rateLimit(rawClient, { 
  maxRequests: 2, 
  perMilliseconds: 1000 
});


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
