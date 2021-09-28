import { Feedback } from "@material-ui/icons";
import axios from "axios";
import { phone } from "faker";

const baseApi = "http://localhost:4000/api/"
export default {
    user(url = baseApi + "user/") {
        return {
            fetchAll: () => axios.get(url + "get-all-users"),
            login: (phone, pass) => axios.post(url + "login/" + phone + "&" + pass),
            findByIdUser: (id) => axios.get(url + "get-user/" + id),
            addUser: userChat => axios.post(url+"register", userChat),
        }
    },
    contact(url = baseApi + "contact/") {
        return {
            getAllContact: (id) => axios.get(url + "get-all-contacts/" + id),
            getSendContact: (id) => axios.get(url + "get-send-contacts/" + id),
            getReceiveContact: (id) => axios.get(url + "get-receive-contacts/" + id),
            searchContact: (phone) => axios.get(url + "search-contact/" + phone),
            detailContact: (idAuth, idShow) => axios.get(url + "detail-contact/" + idAuth + "&" + idShow),
            deleteContact: (id1, id2) => axios.delete(url + "delete-contact/" + id1 + "&" + id2),
            deleteSendContact: (id1, id2) => axios.delete(url + "delete-send-contact/" + id1 + "&" + id2),
            deleteReceiveContact: (id1, id2) => axios.delete(url + "delete-receive-contact/" + id1 + "&" + id2),
            acceptContact: (id1, id2) => axios.put(url + "accept-contact/" + id1 + "&" + id2),
            addContact: (id1, id2) => axios.post(url + "add-contact/" + id1 + "&" + id2)
        }
    }
}