import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const getAllSlider = async () => {
    try {
        const response = await clienteAxios.get("/slider");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getSliderById = async (sliderId) => {
    try {
        const response = await clienteAxios.get(`/slider/${sliderId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const registerSlider = async (sliderData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/slider", sliderData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSlider = async (sliderId, sliderData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/slider/${sliderId}`, sliderData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteSlider = async (sliderId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/slider/${sliderId}`, config);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
        throw error;
    }
};
