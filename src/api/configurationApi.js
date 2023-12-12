import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const getAllConfigs = async () => {
    try {
        const response = await clienteAxios.get("/config");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getConfigById = async (configId) => {
    try {
        const response = await clienteAxios.get(`/config/${configId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerConfig = async (configData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/config", configData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateConfig = async (configId, configData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/config/${configId}`, configData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteConfig = async (configId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/config/${configId}`, config);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
        throw error;
    }
};
