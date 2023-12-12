import clienteAxios from "./apiConfig";

export const getCountData = async () => {
    try {
        const response = await clienteAxios("/dashboard");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const lastProducts = async () => {
    try {
        const response = await clienteAxios("/dashboard/lastProducts");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const lastServices = async () => {
    try {
        const response = await clienteAxios("/dashboard/lastServices");
        return response.data;
    } catch (error) {
        throw error;
    }
};
