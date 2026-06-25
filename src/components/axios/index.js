import axios from 'axios';

export const instance =axios.create({
    baseURL:'https://dummyjson.com',
    timeout:5000,
    headers:{'Content-Type':'application/json',
        'Authorization':`Bearer AUTH_TOKEN`,

    }
})