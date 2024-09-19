import { create } from "zustand";
import { createAuthSlice } from "./slices/AuthSlice";
import { createReservationSlice } from "./slices/ReservationSlice";
import { createCustomerSlice } from "./slices/CustomerSlice";
import { createTableSlice } from "./slices/TableSlice";
import { createUserSlice } from "./slices/UserSlice";

export const userAppStore = create((get, set) => ({
  ...createAuthSlice(get, set),
  ...createReservationSlice(get, set),
  ...createCustomerSlice(get, set),
  ...createTableSlice(get, set),
  ...createUserSlice(get, set),
}));
