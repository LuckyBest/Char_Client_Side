import axios from "axios";


export type projectUrlsObjectT = {
  development: string,
  production: string,
  test: string,
}

const projectUrlsObject:projectUrlsObjectT = {
  development: `http://localhost:5000/api`,
  production: `https://dinauxchatserver.herokuapp.com/api`,
  test: ``,
} 

export const API_URL = projectUrlsObject[process.env.NODE_ENV];

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: any) => {
  config.headers.Authorization = `${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log(`User isn't authorized`);
      }
    }
    throw error;
  }
);

export default $api;
