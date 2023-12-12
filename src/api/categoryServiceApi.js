import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const getAllCategoryService = async () => {
    try {
        const response = await clienteAxios.get("/categoryServices");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryServiceById = async (categoryId) => {
    try {
        const response = await clienteAxios.get(`/categoryServices/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerCategoryService = async (categoryData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/categoryServices", categoryData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategoryService = async (categoryId, categoryData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/categoryServices/${categoryId}`, categoryData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryService = async (categoryId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/categoryServices/${categoryId}`, config);
        return response.data;
    } catch (error) {
        // toast.warn(error?.response?.data?.error);
        throw error;
    }
};
