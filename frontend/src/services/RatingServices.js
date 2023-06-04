import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllRatings = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/ratings`);
    return data
};

export const getRatingById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/ratings/${id}`);
    return data;
};

export const getRatingByOwnerId = async (ownerId) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/ratings/owner/${ownerId}`);
    return data;
};

export const getRatingByProductId = async (productId) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/ratings/product/${productId}`);
    return data;
}

export const addRating = async (product, rating, owner) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/ratings`, {
        for: product,
        rating,
        owner
    });
    return data;
};

export const updateRating = async (id, product, rating, owner) => {
    const { data } = await axios.put(`${REACT_APP_API_BASE_URL}/ratings/${id}`, {
        for: product,
        rating,
        owner
    });
    return data;
};

export const deleteRating = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/ratings/${id}`);
    return data;
};