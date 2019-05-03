import axios from 'axios';

let instance = null;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default class Backend {
    API_URL = 'https://dev.smartleo.ru/api/';
    authToken = 'd708868afc01f6e6289faba4a3ba82397YGkwhs3Tddd87/O+mwtSe0MzCt1SXP5HedFmcMpDQpWuq+w95YHNcrYl/0pHzpm';
    
    authAxios = null;

    constructor() {
        if (!instance) {
            instance = this;
            let token = localStorage.getItem('user.authToken');
            setAuthToken(token);
        }
    }

    auth() {
        let token = localStorage.getItem('user.authToken');
        setAuthToken(token);
    }
    login(data) {
        return new Promise((resolve, reject) => {
            axios.post('https://dev.smartleo.ru/api/login', data)
                .then(response => {
                    let token = response.data.token;
                    setAuthToken(token);
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }
    logout() {      
        setAuthToken();
    }
    register(data) {
        return axios.post('https://dev.smartleo.ru/api/register', data);
    }

    getProducts() {
        return axios.get('https://dev.smartleo.ru/api/products?page=1')
    }
    addProduct(product) {
        return axios.post('https://dev.smartleo.ru/api/products', product);
    }
    editProduct(product) {
        return axios.put(`https://dev.smartleo.ru/api/products/${product.id}`);
    }
    deleteProduct(id) {
        return axios.delete(`https://dev.smartleo.ru/api/products/${id}`);
    }

    getComments(productId) {
        return axios.get(`https://dev.smartleo.ru/api/comments/${productId}/`);
    }
    addComment(comment, productId) {
        return axios.post(`https://dev.smartleo.ru/api/comments/${productId}`, comment);
    }
    deleteComment(id) {
        return axios.delete(`https://dev.smartleo.ru/api/comments/${id}`);
    }
}

