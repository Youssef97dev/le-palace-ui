export const createUserSlice = (set: any, get: any) => ({
  user_firstName: "",
  setUserFirstName: (user_firstName: string) => {
    set({ user_firstName });
  },

  user_lastName: "",
  setUserLastName: (user_lastName: string) => {
    set({ user_lastName });
  },

  user_email: "",
  setUserEmail: (user_email: string) => {
    set({ user_email });
  },

  password: "",
  setPassword: (password: string) => {
    set({ password });
  },

  username: "",
  setUsername: (username: string) => {
    set({ username });
  },

  refreshUserData: false,
  setRefreshUserData: () => {
    set({ refreshUserData: !get().refreshUserData });
  },

  showUserModal: false,
  setShowUserModal: () => {
    set({ showUserModal: !get().showUserModal });
  },
});
