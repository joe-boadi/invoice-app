import axios from "axios";

export default axios.create({
    baseURL: "https://invoice-app-bknd-strapi-cloud.onrender.com/invoices",
    headers: {
        Authorization: 'Bearer ${token}'
    }
    ,
})