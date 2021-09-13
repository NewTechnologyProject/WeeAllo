/* eslint-disable import/no-anonymous-default-export */
import { Feedback } from "@material-ui/icons";
import axios from "axios";

const baseApi = "http://localhost:4000/api/"

export default {
    user(url = baseApi + 'user/get-all-users') {
        return {
            fetchAll: () => axios.get(url),
        }
    },
}