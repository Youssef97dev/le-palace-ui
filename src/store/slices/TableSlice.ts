export const createTableSlice = (set: any, get: any) => ({
  tableNumber: "",
  setTableNumber: (tableNumber: string) => {
    set({ tableNumber });
  },

  capacity: "",
  setcapacity: (capacity: string) => {
    set({ capacity });
  },

  status: "",
  setStatus: (status: string) => {
    set({ status });
  },

  refreshTableData: false,
  setRefreshTableData: () => {
    set({ refreshTableData: !get().refreshTableData });
  },

  showTableModal: false,
  setShowTableModal: () => {
    set({ showTableModal: !get().showTableModal });
  },
});
