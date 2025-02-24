import { create } from "zustand";

const useAuthstore = create(()=>{
    return {
        token:"",
        user: null,   
    };
});
export default useAuthstore