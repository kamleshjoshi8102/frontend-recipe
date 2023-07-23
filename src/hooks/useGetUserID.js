export const useGetUserID = () => {
  // we are just sending the userid from local storage as hooks
  return window.localStorage.getItem("userID");
};
