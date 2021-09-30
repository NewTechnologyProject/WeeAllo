package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Contact;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.services.ContactService;
import sv.iuh.weeallo.services.UserService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/contact")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @GetMapping("/get-all-contacts/{id}")
    public List<UserChat> getAllContact(@PathVariable("id") Long id) {
        return contactService.getAllContact(id);
    }
    @GetMapping("/get-send-contacts/{id}")
    public List<UserChat> getSendContact(@PathVariable("id") Long id) {
        return contactService.getAllSend(id);
    }
    @GetMapping("/get-receive-contacts/{id}")
    public List<UserChat> getReceiveContact(@PathVariable("id") Long id) {
        return contactService.getAllReceive(id);
    }
    //Add Contact
    @PostMapping("/add-contact/{idSend}&{idReceive}")
    public void addContact(@PathVariable("idSend") Long idSend, @PathVariable("idReceive") Long idReceive) {
        contactService.AddContact(idSend,idReceive);
    }
    //SearchContact
    @GetMapping(value = {"/search-contact/{phone}","/search-contact"})
    public List<UserChat> searchContact(@PathVariable(value = "phone",required = false) String phone) {
        if(phone==null){
            return null;
        }
        else if(phone.length()<=7){
            return null;
        }else
            return contactService.searchToAdd(phone);
    }
    @GetMapping("/detail-contact/{idAuth}&{idShow}")
    public UserChat detailContact(@PathVariable("idAuth") Long idAuth, @PathVariable("idShow") Long idShow) {
        return contactService.showDetailContact(idAuth,idShow);
    }
    @DeleteMapping("/delete-contact/{id1}&{id2}")
    public List<UserChat> deleteContact(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
        return contactService.DeleteContact(id1,id2);
    }
    @DeleteMapping("/delete-send-contact/{id1}&{id2}")
    public List<UserChat> deleteSendContact(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
        return contactService.DeleteSendContact(id1,id2);
    }
    @DeleteMapping("/delete-receive-contact/{id1}&{id2}")
    public List<UserChat> deleteReceiveContact(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
        return contactService.DeleteReceiveContact(id1,id2);
    }
    @PutMapping("/accept-contact/{id1}&{id2}")
    public List<UserChat> acceptContact(@PathVariable("id1") Long id1, @PathVariable("id2") Long id2) {
        return contactService.AcceptContact(id1,id2);
    }
}
