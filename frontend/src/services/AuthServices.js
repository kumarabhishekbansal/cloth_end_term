import axios from 'axios';
let REACT_APP_API_BASE_URL='http://localhost:4000'
export const Register = async (firstName, lastName, email, password, phone) =>{
    console.log("enter react register");
    return await axios.post(`${REACT_APP_API_BASE_URL}/users/register`,{
        firstName,
        lastName,
        email,
        password,
        phone
    });
};

export const Login = async (email, password)=>{
    return await axios.post(`${REACT_APP_API_BASE_URL}/users/login`,{
        email,
        password
    });
};