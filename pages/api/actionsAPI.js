// import axios from './apiAxios'
import axios from 'axios'
const url = 'https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001'
const getallAPI = () => {
    return axios.get(`${url}/item/blogs`);
};
const getAPI = id => {
    return axios.get(`${url}/item/blogs/${id}`);
};
const addAPI = data => {
    return axios.post(`${url}/item/blogs`, data);
};

const updateAPI = (id, data) => {
    return axios.put(`${url}/item/blogs/${id}`, data);
};
const deleteAPI = id => {
    return axios.delete(`${url}/item/blogs/${id}`);
};
export default {
    getallAPI,
    getAPI,
    addAPI,
    updateAPI,
    deleteAPI
};