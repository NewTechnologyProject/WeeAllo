package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.Contact;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.repository.ContactRepository;
import sv.iuh.weeallo.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private UserRepository userRepository;
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
        Contact contact=contactRepository.getContact(id1,id2);
        contact.setStatus("friend");
        contactRepository.save(contact);
        List<UserChat> list=getAllReceive(id2);
        return list;
    }
}
