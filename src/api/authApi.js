import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const login = async (email, password) => {
    try {
        const response = await clienteAxios.post("/auth/login", { email, password });
        const user = response?.data;
        return user;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
    }
};
