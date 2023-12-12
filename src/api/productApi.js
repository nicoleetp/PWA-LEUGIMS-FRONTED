import clienteAxios from "./apiConfig";

export const getAllProducts = async () => {
    try {
        const response = await clienteAxios.get("/product");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await clienteAxios.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registerProduct = async (productData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.post("/product", productData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.put(`/product/${productId}`, productData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/product/${productId}`, config);
        return response.data;
    } catch (error) {
        toast.warn(error?.response?.data?.error);
        throw error;
    }
};
