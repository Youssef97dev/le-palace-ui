import { createUrl, post, get } from "./http";
import axios from "axios";

export const getAllUsers = async () => {
  try {
    const result = await axios.get(createUrl(`/api/users`));
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addNewUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string
) => {
  try {
    const result = await axios.post(createUrl(`/api/signup`), {
      firstName,
      lastName,
      email,
      password,
      roles: "user",
      username,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateUser = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  username: string
) => {
  try {
    const result = await axios.patch(createUrl(`/api/users/${id}`), {
      firstName,
      lastName,
      email,
      password: password.length > 0 && password,
      username,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
