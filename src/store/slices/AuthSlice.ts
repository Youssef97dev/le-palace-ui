export const createAuthSlice = (set: any, get: any) => ({
  isLoggedIn: false,
  userInfo: null,
  loadingData: false,
  errorMessage: "",
  setIsLoggedIn: (status: boolean) => {
    set({ isLoggedIn: status });
  },
  setUserInfo: (userInfo: any) => {
    set({ userInfo });
  },
  setLoadingData: (loadingData: boolean) => set({ loadingData }),
  setErrorMessage: (errorMessage: string) => set({ errorMessage }),
});
