package sv.iuh.weeallo.services;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.Contact;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.ContactRepository;
import sv.iuh.weeallo.repository.RoomChatRepository;
import sv.iuh.weeallo.repository.UserGroupRepository;
import sv.iuh.weeallo.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ContactService {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomChatRepository roomChatRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;
    //Get all contact of user
    public List<UserChat> getAllContact(Long id){
        List<Contact> list= contactRepository.getAllContact(id);
        List<UserChat> userChats= new ArrayList<>();
        for(Contact contact:list){
            if(contact.getSendId().getId()==id){
                UserChat userChat= userRepository.filterContact(contact.getReceiveId().getId());
                userChats.add(userChat);
            }if(contact.getReceiveId().getId()==id){
                UserChat userChat= userRepository.filterContact(contact.getSendId().getId());
                userChats.add(userChat);
            }
        }
        return userChats;
    }
    //Get all send contact of user
    public List<UserChat> getAllSend(Long id){
        List<Contact> list= contactRepository.getSendContact(id);
        List<UserChat> userChats= new ArrayList<>();
        for(Contact contact:list){
            UserChat userChat= userRepository.filterContact(contact.getReceiveId().getId());
            userChats.add(userChat);
        }
        return userChats;
    }
    //Get all receive contact of user
    public List<UserChat> getAllReceive(Long id){
        List<Contact> list= contactRepository.getReceiveContact(id);
        List<UserChat> userChats= new ArrayList<>();
        for(Contact contact:list){
            UserChat userChat= userRepository.filterContact(contact.getSendId().getId());
            userChats.add(userChat);
        }
        return userChats;
    }
    //Add contact
    public void AddContact(Long idSend, Long idReceive){
        Contact contact= new Contact();
        UserChat userSend= userRepository.findById(idSend).get();
        UserChat userReceive= userRepository.findById(idReceive).get();
        contact.setSendId(userSend);
        contact.setReceiveId(userReceive);
        contact.setStatus("wait");
        contactRepository.save(contact);
    }
    //Search
    public List<UserChat> searchToAdd(String phone){
        return userRepository.searchFriend(phone);
    }
    public UserChat showDetailContact(Long idAuth, Long idShow){
        UserChat userChat=userRepository.findContactById(idShow);
        userChat.setStatus("none");
        if(idAuth==idShow){
            userChat.setStatus("you");
        }else {
            List<Contact> contacts=contactRepository.findAll();
            for (Contact contact:contacts) {

                if(contact.getSendId().getId()==idAuth && contact.getReceiveId().getId()==idShow && contact.getStatus().equals("wait")){
                    userChat.setStatus("receive");
                }
                else if(contact.getReceiveId().getId()==idAuth && contact.getSendId().getId()==idShow && contact.getStatus().equals("wait")){
                    userChat.setStatus("send");
                }
                else if((contact.getReceiveId().getId()==idAuth
                        && contact.getSendId().getId()==idShow
                        && contact.getStatus().equals("friend"))
                        || (contact.getSendId().getId()==idAuth
                        && contact.getReceiveId().getId()==idShow
                        && contact.getStatus().equals("friend"))){
                    userChat.setStatus("friend");
                }
            }
        }

        return userChat;
    }
    //Delete
    public List<UserChat> DeleteContact(Long id1,Long id2){
        Contact contact=contactRepository.getContactToDelete(id1,id2);
        contactRepository.delete(contact);
        List<UserChat> list=getAllContact(id1);
        return list;
    }
    public List<UserChat> DeleteSendContact(Long id1,Long id2){
        Contact contact=contactRepository.getContactToDelete(id1,id2);
        contactRepository.delete(contact);
        List<UserChat> list=getAllSend(id1);
        return list;
    }
    public List<UserChat> DeleteReceiveContact(Long id1,Long id2){
        Contact contact=contactRepository.getContactToDelete(id1,id2);
        contactRepository.delete(contact);
        List<UserChat> list=getAllReceive(id1);
        return list;
    }
    //Accept
    public List<UserChat> AcceptContact(Long id1,Long id2){
        LocalDateTime now = LocalDateTime.now();
        String date = dtf.format(now);

        Contact contact=contactRepository.getContact(id1,id2);
        contact.setStatus("friend");
        contactRepository.save(contact);

        //create room
        RoomChat roomChat=new RoomChat();
        roomChat.setCreateAt(date);
        roomChatRepository.save(roomChat);
        UserChat userChat= userRepository.findById(id1).get();
        UserChat userChat2= userRepository.findById(id2).get();
        UserGroup userGroup= new UserGroup(roomChat,userChat);
        UserGroup userGroup2= new UserGroup(roomChat,userChat2);
        userGroupRepository.save(userGroup);
        userGroupRepository.save(userGroup2);

        List<UserChat> list=getAllReceive(id2);
        return list;
    }
    public UserChat findByPhone(String phone,Long idAuth){
        UserChat userChat=userRepository.findContactByPhone(phone);
        if(userChat==null){
            return null;
        }
        userChat.setStatus("none");
        if(idAuth==userChat.getId()){
            userChat.setStatus("you");
        }else {
            List<Contact> contacts=contactRepository.findAll();
            for (Contact contact:contacts) {

                if(contact.getSendId().getId()==idAuth && contact.getReceiveId().getId()==userChat.getId() && contact.getStatus().equals("wait")){
                    userChat.setStatus("receive");
                }
                else if(contact.getReceiveId().getId()==idAuth && contact.getSendId().getId()==userChat.getId() && contact.getStatus().equals("wait")){
                    userChat.setStatus("send");
                }
                else if((contact.getReceiveId().getId()==idAuth
                        && contact.getSendId().getId()==userChat.getId()
                        && contact.getStatus().equals("friend"))
                        || (contact.getSendId().getId()==idAuth
                        && contact.getReceiveId().getId()==userChat.getId()
                        && contact.getStatus().equals("friend"))){
                    userChat.setStatus("friend");
                }
            }
        }

        return userChat;
    }
    public int countFriend(Long id){
        List<Contact> list= contactRepository.getAllContact(id);
        int friends = list.size();
        return friends;
    }
    public List<UserChat> listDeviceContact(String jsonString,Long userAuth) {
        List<UserChat> list = new ArrayList<>();
        System.out.println(jsonString);
        JsonArray jsonArraySend = new JsonParser().parse(jsonString).getAsJsonArray();
        for (JsonElement ls : jsonArraySend) {
            JsonObject jsonObjectSend = ls.getAsJsonObject();
            if(jsonObjectSend.has("phoneNumbers")){
                JsonArray phone = jsonObjectSend.get("phoneNumbers").getAsJsonArray();
                JsonObject jsonObject = (JsonObject) phone.get(0);
                String phoneNumber = jsonObject.get("number").getAsString();
                String phoneNum = phoneNumber.replaceAll("\\+" + "84", "0");
                UserChat u = findByPhone(phoneNum,userAuth);
                if(u!=null){
                    list.add(u);
                }
            }
        }
        return list;
    }
    public List<UserChat> searchToAddMobile(String phone,Long userAuth){
        List<UserChat> list= new ArrayList<>();
        List<UserChat> listUser= userRepository.searchFriend(phone);
        for (UserChat user:listUser) {
            UserChat u=findByPhone(user.getPhone(),userAuth);
            if(u!=null){
                list.add(u);
            }
        }
        return list;
    }
}
