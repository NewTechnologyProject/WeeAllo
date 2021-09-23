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

    @GetMapping("/get-all-contacts")
    public List<Contact> getAllUser() {
        return contactService.getAllContact();
    }
    //Add Contact
    @PostMapping("/add-contact/{idSend}&{idReceive}")
    public void addContact(@PathVariable("idSend") Long idSend, @PathVariable("idReceive") Long idReceive) {
        contactService.AddContact(idSend,idReceive);
    }
    //SearchContact
    @GetMapping("/search-contact/{id}&{phone}")
    public List<UserChat> addContact(@PathVariable("id") Long id, @PathVariable("phone") String phone) {
        return contactService.searchToAdd(id,phone);
    }
}
