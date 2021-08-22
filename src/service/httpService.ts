import axios from "axios";

const myAxios = () => axios.create({
    baseURL: "http://localhost:4030"
})

export default {
    get: myAxios().get,
    post: myAxios().post,
    put: myAxios().put,
    delete: myAxios().delete,
}
