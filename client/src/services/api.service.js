import { Feedback } from "@material-ui/icons";
import axios from "axios";

const baseApi = "http://localhost:4000/api/"
export default {
    user(url = baseApi + "user/") {
        return {
            fetchAll: () => axios.get(url + "get-all-users"),
            login: (phone, pass) => axios.post(url + "login/" + phone + "&" + pass),
            register:(phone,password,firstname,lastname)=>axios.post(url + "register/" + phone + "&" + password + "&" + firstname + "&" + lastname),
        }
    },
}