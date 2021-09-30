package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.services.MessageService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/messages")
    public Message createMessage(@RequestBody Message message){
        return messageService.sendMessage(message);
    }


}
