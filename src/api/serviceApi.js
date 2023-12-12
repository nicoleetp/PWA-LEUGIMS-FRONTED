import clienteAxios from "./apiConfig";

export const getAllServices = async () => {
    try {
        const response = await clienteAxios.get("/service");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getServiceById = async (serviceId) => {
    try {
        const response = await clienteAxios.get(`/service/${serviceId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerService = async (serviceData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/service", serviceData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateService = async (serviceId, serviceData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/service/${serviceId}`, serviceData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteService = async (serviceId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/service/${serviceId}`, config);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
        throw error;
    }
};
