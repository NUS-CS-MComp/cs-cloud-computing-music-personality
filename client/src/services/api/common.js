import axios from 'axios'

export default axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : 'https://jd3thgi0ba.execute-api.ap-southeast-1.amazonaws.com/prod',
    withCredentials: true,
})
