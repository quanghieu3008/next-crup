import axios from 'axios'


export default axios.create({
    baseUrl: "https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/",
    headers: {
        "Content-Type": "application/json"
    }
})