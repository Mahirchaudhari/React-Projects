import axios from "axios";

export const apiClient = await axios.create({
    baseURL: 'http://localhost:8080'
})