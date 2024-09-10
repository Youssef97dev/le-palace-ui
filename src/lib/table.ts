import { createUrl, post, get } from "./http";
import axios from "axios";

export const getAllTables = async () => {
  try {
    const result = await axios.get(createUrl(`/api/tables`));
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addNewTables = async (tableNumber: number, capacity: number) => {
  const result = await axios.post(createUrl(`/api/tables`), {
    tableNumber,
    capacity,
    status: "Available",
  });
  return result;
};

export const getAvailableTables = async (time: string, date: string) => {
  try {
    const result = await axios.get(createUrl(`/api/tables/available-tables`), {
      params: {
        time,
        date,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};
