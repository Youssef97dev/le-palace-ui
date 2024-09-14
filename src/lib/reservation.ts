import { createUrl, post, get } from "./http";
import axios from "axios";

export const getAllReservations = async () => {
  try {
    const result = await axios.get(createUrl(`/api/reservations`));
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const changeReservationStatus = async (status: string, id: string) => {
  try {
    const result = await axios.patch(createUrl(`/api/reservations/${id}`), {
      status,
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addNewReservation = async (
  userId: string,
  customerId: string,
  reservationDate: any,
  reservationTime: string,
  cover: number,
  sol: string,
  reservationNote: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  note: string
) => {
  if (customerId) {
    try {
      const result = await axios.post(createUrl(`/api/reservations`), {
        userId,
        customerId,
        floor: sol,
        reservationDate,
        reservationTime,
        cover,
        note: reservationNote,
        status: "Confirmed",
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    try {
      const resultCustomer = await axios.post(createUrl(`/api/customers`), {
        firstName,
        lastName,
        email,
        phoneNumber,
        note,
      });

      if (resultCustomer.status === 201) {
        const result = await axios.post(createUrl(`/api/reservations`), {
          userId,
          customerId: resultCustomer.data.id,
          floor: sol,
          reservationDate,
          reservationTime,
          cover,
          note: reservationNote,
          status: "Confirmed",
        });
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getCount = async (type: string) => {
  try {
    const result = await axios.get(createUrl(`/api/${type}`));
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllReservationsToday = async () => {
  try {
    const result = await axios.get(createUrl(`/api/reservations/today`));
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getReservationsByMonth = async () => {
  try {
    const result = await axios.get(
      createUrl(`/api/reservations/by-month?year=2024`)
    );
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
