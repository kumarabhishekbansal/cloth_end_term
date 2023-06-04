import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const getAllImages = async () => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/images`);
    return data;
};

export const getImageById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/images/${id}`);
    return data;
};

export const addImage = async (url) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/images`, {
        url
    });
    return data;
};

export const deleteImage = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/images/${id}`);
    return data;
};

export const getAllMiniImages = async () => {
    // console.log("getAllMiniImages",process.env.REACT_APP_API_BASE_URL);
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/minis`);
    return data;
};

export const getMiniImageById = async (id) => {
    const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/minis/${id}`);
    return data;
};

export const addMiniImage = async (url) => {
    const { data } = await axios.post(`${REACT_APP_API_BASE_URL}/minis`, {
        url
    });
    return data;
};

export const deleteMiniImage = async (id) => {
    const { data } = await axios.delete(`${REACT_APP_API_BASE_URL}/minis/${id}`);
    return data;
};

// CLOUDINARY

export const uploadImageToCloudinary = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", 'cloth_Abhi');
    data.append("cloud_name", 'do2yjfyfe');
    const result = await fetch(`https://api.cloudinary.com/v1_1/do2yjfyfe/image/upload`, {
        method: 'POST',
        body: data
    })
        .then(res => res.json());
    return result;
};