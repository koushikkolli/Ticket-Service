import axios from "axios"


export default axios.create({
    baseURL: "https://ticket-service-backend.herokuapp.com"

})