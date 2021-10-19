import axios from "axios";
// import { Feedback } from "@material-ui/icons";
// import { phone } from "faker";

const baseApi = "http://localhost:4000/api/";
export default {
  user(url = baseApi + "user/") {
    return {
      fetchAll: () => axios.get(url + "get-all-users"),
      login: (phone, pass) => axios.post(url + "login/" + phone + "&" + pass),
      findByIdUser: (id) => axios.get(url + "detail/" + id),
      updateByIdUser: (userChat, id) =>
        axios.put(url + "detail/" + id, userChat),
      findByPhoneUser: (dt) => axios.get(url + "phone/" + dt),
      addUser: (userChat) => axios.post(url + "register", userChat),
      listRoom: (userId) => axios.get(url + userId + "/rooms"),
      listFriend: (userId) => axios.get(url + userId + "/friends"),
    };
  },
  contact(url = baseApi + "contact/") {
    return {
      getAllContact: (id) => axios.get(url + "get-all-contacts/" + id),
      getSendContact: (id) => axios.get(url + "get-send-contacts/" + id),
      getReceiveContact: (id) => axios.get(url + "get-receive-contacts/" + id),
      searchContact: (phone) => axios.get(url + "search-contact/" + phone),
      detailContact: (idAuth, idShow) =>
        axios.get(url + "detail-contact/" + idAuth + "&" + idShow),
      deleteContact: (id1, id2) =>
        axios.delete(url + "delete-contact/" + id1 + "&" + id2),
      deleteSendContact: (id1, id2) =>
        axios.delete(url + "delete-send-contact/" + id1 + "&" + id2),
      deleteReceiveContact: (id1, id2) =>
        axios.delete(url + "delete-receive-contact/" + id1 + "&" + id2),
      acceptContact: (id1, id2) =>
        axios.put(url + "accept-contact/" + id1 + "&" + id2),
      addContact: (id1, id2) =>
        axios.post(url + "add-contact/" + id1 + "&" + id2),
      searchbyphone: (phone, id) =>
        axios.get(url + "search-by-phone/" + phone + "&" + id),
    };
  },
  roomchat(url = baseApi + "rooms/") {
    return {
      listMessages: (roomId) => axios.get(url + roomId + "/messages"),
      newGroupChat: (groupChat) => axios.post(url, groupChat),
      listMembers: (roomId) => axios.get(url + roomId + "/users"),
      deleteRoom: (roomId) => axios.delete(url + roomId),
      updateCreator: (roomId, creator) =>
        axios.put(url + roomId + "&" + creator),
    };
  },
  usergroup(url = baseApi + "usergroups/") {
    return {
      addUserGroup: (userGroup) => axios.post(url, userGroup),
      deleteUserGroup: (roomId, userId) =>
        axios.delete(url + roomId + "&" + userId),
    };
  },

  message(url = baseApi + "messages/chat") {
    return {
      addMessage: (message) => axios.post(url, message),
    };
  },
  upload(url = baseApi + "storage/") {
    return {
      image: (formData) =>
        axios.post(url + "uploadFile/", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }),
    };
  },
};
