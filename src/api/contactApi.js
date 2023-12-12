import clienteAxios from "./apiConfig";

export const getAllContact = async () => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await clienteAxios.get("/contact", config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteContact = async (contactId) => {
    try {
        const token = localStorage.getItem("token_sesion");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await clienteAxios.delete(`/contact/${contactId}`, config);
        return response.data;
    } catch (error) {
        // toast.warn(error?.response?.data?.error);
        throw error;
    }
};
