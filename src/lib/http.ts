import axios from "axios";
import { jwtDecode } from "jwt-decode";

//const apiUrl = process.env.NEXT_PUBLIC_API_FRONT_URI;
const apiUrl = "http://localhost:3000";
const jwtKey = "accessToken";

interface DecodedToken {
  exp: number; // Token expiration time
}

const isTokenExpired = (token: any) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get the current time in seconds
    return decoded.exp < currentTime; // Token is expired if `exp` is less than current time
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If decoding fails, treat it as expired
  }
};

axios.interceptors.request.use(
  (config: any) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const accessToken = localStorage.getItem(jwtKey);
    if (allowedOrigins.includes(origin)) {
      if (isTokenExpired(accessToken)) {
        localStorage.removeItem(jwtKey);
        localStorage.removeItem("user-storage");
      } else {
        config.headers.authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createUrl = (endpoint: any) => new URL(endpoint, apiUrl).href;
export const isStoredJwt = () => Boolean(localStorage.getItem(jwtKey));
export const setStoredJwt = (accessToken: any) =>
  localStorage.setItem(jwtKey, accessToken);

export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
