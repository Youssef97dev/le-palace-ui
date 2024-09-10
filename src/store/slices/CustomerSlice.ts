export const createCustomerSlice = (set: any, get: any) => ({
  firstName: "",
  setFirstName: (firstName: string) => {
    set({ firstName });
  },

  lastName: "",
  setLastName: (lastName: string) => {
    set({ lastName });
  },

  email: "",
  setEmail: (email: string) => {
    set({ email });
  },

  phoneNumber: "",
  setPhoneNumber: (phoneNumber: string) => {
    set({ phoneNumber });
  },

  note: "",
  setNote: (note: string) => {
    set({ note });
  },

  refreshCustomerData: false,
  setRefreshCustomerData: () => {
    set({ refreshCustomerData: !get().refreshCustomerData });
  },

  showCustomerModal: false,
  setShowCustomerModal: () => {
    set({ showCustomerModal: !get().showCustomerModal });
  },
});
