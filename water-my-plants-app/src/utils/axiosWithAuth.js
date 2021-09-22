import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem("token")

    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'https://ft-water-my-plants-5.herokuapp.com/api'
    })
}

export default axiosWithAuth;