import clienteAxios from "./apiConfig";
import { toast } from "react-toastify";

export const getAllCategories = async () => {
    try {
        const response = await clienteAxios.get("/category");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const response = await clienteAxios.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerCategory = async (categoryData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/category", categoryData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/category/${categoryId}`, categoryData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/category/${categoryId}`, config);
        return response.data;
    } catch (error) {
        // toast.warn(error?.response?.data?.error);
        throw error;
    }
};
