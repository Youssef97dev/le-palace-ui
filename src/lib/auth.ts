import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

export const me = async () => {
  return isStoredJwt()
    ? (await get(createUrl("/api/me")).catch(() => null))?.data
    : null;
};

export const login = async (username: string, password: string) => {
  try {
    console.log(username, password);
    const result = await post(createUrl("/api/login"), { username, password });
    setStoredJwt(result.data.accessToken);
    return me();
  } catch (error) {
    return error;
  }
};

export const checkUser = async (email: string) => {
  try {
    const result = await post(createUrl("/api/check-user"), { email });
    return result.data;
  } catch (error) {
    return error;
  }
};
