package sv.iuh.weeallo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.services.MessageService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin
@RestController
@RequestMapping("/api")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @PostMapping("/messages/chat")
    public Message createMessage(@RequestBody Message message){
        return messageService.sendMessage(message);
    }

    @DeleteMapping(value = "/message/{id}")
    public ResponseEntity<Message> deleteMessage(@PathVariable("id") Long id){
        Optional<Message> message = messageService.findById(id);
        if(!message.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        messageService.remove(message.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value="/message/{id}", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> getMessageById(@PathVariable("id") Long id) {
        Optional<Message> message = messageService.findById(id);
        if(!message.isPresent())
            return new ResponseEntity<>(message.get(), HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(message.get(), HttpStatus.OK);
    }
    
    @RequestMapping(value="/message", method=RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Message>> getMessageByUserId(@RequestParam(value="userId") String userId) {
        Long id = Long.parseLong(userId);
        List<Message> messages = messageService.findMessagesByUser(id);
        if(messages.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(messages, HttpStatus.OK);   
    }
    
}
