import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const getAllHistory = async () => {
    try {
        const response = await clienteAxios.get("/about");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHistoryById = async (historyId) => {
    try {
        const response = await clienteAxios.get(`/about/${historyId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerHistory = async (historyData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/about", historyData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateHistory = async (historyId, historyData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/about/${historyId}`, historyData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteHistory = async (historyId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/about/${historyId}`, config);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
        throw error;
    }
};
