import { createUrl, post, get } from "./http";
import axios from "axios";

export const getAllCustomers = async () => {
  try {
    const result = await axios.get(createUrl(`/api/customers`));
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addNewCustomer = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  note: string
) => {
  try {
    const result = await axios.post(createUrl(`/api/customers`), {
      firstName,
      lastName,
      email,
      phoneNumber,
      note,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateCustomer = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  note: string
) => {
  try {
    const result = await axios.patch(createUrl(`/api/customers/${id}`), {
      firstName,
      lastName,
      email,
      phoneNumber,
      note,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
