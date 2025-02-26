import { create } from "zustand";

const useAuthstore = create(() => {
  const ls_string = localStorage.getItem("auth");

  if (!ls_string) {
    return {
      token: "",
      user: null,
    };
  }
  const ls = JSON.parse(localStorage.getItem("auth"));
  return {
    token: ls.token,
    user: ls.user,
  };
});
export default useAuthstore;
