export const createReservationSlice = (set: any, get: any) => ({
  refreshData: false,
  setRefreshData: () => {
    set({ refreshData: !get().refreshData });
  },
  currentDate: new Date(),
  setCurrentDate: (currentDate: Date) => {
    set({ currentDate });
  },
  showModal: false,
  setShowModal: () => {
    set({ showModal: !get().showModal });
  },
  reservationDate: new Date(),
  setReservationDate: (reservationDate: Date) => {
    set({ reservationDate });
  },

  reservationTime: "",
  setReservationTime: (reservationTime: string) => {
    set({ reservationTime });
  },

  reservationCover: "1",
  setReservationCover: (reservationCover: string) => {
    set({ reservationCover });
  },

  availableTables: [],
  setAvailableTables: (availableTables: any) => {
    set({ availableTables });
  },

  customers: [],
  setCustomers: (customers: any) => {
    set({ customers });
  },

  tableId: "",
  setTableId: (tableId: string) => {
    set({ tableId });
  },

  reservationNote: "",
  setReservationNote: (reservationNote: string) => {
    set({ reservationNote });
  },

  customerId: "",
  setCustomerId: (customerId: string) => {
    set({ customerId });
  },

  sol: "",
  setSol: (sol: string) => {
    set({ sol });
  },
});
