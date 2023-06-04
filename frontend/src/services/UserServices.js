import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllUsers = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/users`);
    return data;
};

export const getUserById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};

export const updateUser = async ( id, address, phone ) => {
    const { data } = await axios.put(`${REACT_APP_API_BASE_URL}/users/${id}`, {
        address,
        phone
    });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};

export const addFavorite = async (id, productId) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/users/${id}/favorite/${productId}`);
    return data;
};

export const deleteFavorite = async (id, productId) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/users/${id}/favorite/${productId}`);
    return data;
};