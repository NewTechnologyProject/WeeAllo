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
    public List<Contact> getAllContact(){
        List<Contact> list= contactRepository.findAll();
        List<Contact> listContacts= new ArrayList<>();
        for (int i=0;i<list.size();i++){
            UserChat userChatSend=new UserChat();
            userChatSend.setId(list.get(i).getSendId().getId());
            UserChat userChatReiceive=new UserChat();
            userChatReiceive.setId(list.get(i).getReceiveId().getId());
            Contact contact= new Contact(list.get(i).getId(),list.get(i).getStatus(),userChatSend,userChatReiceive);
            listContacts.add(contact);
        }
        return listContacts;
    }
    public void AddContact(Long idSend, Long idReceive){
        Contact contact= new Contact();
        UserChat userSend= userRepository.findById(idSend).get();
        UserChat userReceive= userRepository.findById(idReceive).get();
        contact.setSendId(userSend);
        contact.setReceiveId(userReceive);
        contact.setStatus("wait");
        contactRepository.save(contact);
    }
    public List<UserChat> searchToAdd(Long id,String phone){
        return userRepository.searchFriend(phone);
    }
}
