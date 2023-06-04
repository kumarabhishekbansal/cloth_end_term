import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllGenres = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/genres`);
    return data;
};

export const getGenreById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/genres/${id}`);
    return data;
};

export const addGenre = async (name, status) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/genres`, {
        name,
        status
    });
    return data;
};

export const updateGenre = async (id, name, status) => {
    const { data } = await axios.put(`${REACT_APP_API_BASE_URL}/genres/${id}`, {
        name,
        status
    });
    return data;
};

export const deleteGenre = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/genres/${id}`);
    return data;
};