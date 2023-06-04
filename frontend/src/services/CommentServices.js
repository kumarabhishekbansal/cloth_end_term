import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllComments = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/comments`);
    return data;
};

export const getCommentById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/comments/${id}`);
    return data;
};

export const getCommentByAuthorId = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/comments/author/${id}`);
    return data;
};

export const getCommentByProductId = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/comments/product/${id}`);
    return data;
};

export const addComment = async (productId, comment, author) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/comments`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const updateComment = async (id, productId, comment, author) => {
    const { data } = await axios.put(`${REACT_APP_API_BASE_URL}/comments/${id}`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const deleteComment = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/comments/${id}`);
    return data;
};