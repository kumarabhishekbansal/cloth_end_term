import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllCategories = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/categories`);
    return data;
};

export const getCategoryByGenre = async (genre) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/categories/genre/${genre}`);
    return data;
};

export const getCategoryById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/categories/${id}`);
    return data;
};

export const addCategory = async (name, genre, status) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/categories`, {
        name,
        genre,
        status
    });
    return data;
};

export const updateCategory = async (id, name, genre, status) => {
    const { data } = await axios.put(`${REACT_APP_API_BASE_URL}/categories/${id}`, {
        name,
        genre,
        status
    });
    return data;
};

export const deleteCategory = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/categories/${id}`);
    return data;
};