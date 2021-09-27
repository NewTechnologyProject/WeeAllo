package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.repository.MessageRepository;
import sv.iuh.weeallo.services.MessageService;
import sv.iuh.weeallo.services.RoomChatService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoomChatController {
    @Autowired
    private RoomChatService roomChatService;
    @Autowired
    private MessageService messageService;

    @GetMapping("/rooms/{roomId}")
    public RoomChat getRoomById(@PathVariable("roomId") Long roomId){
        return roomChatService.getById(roomId);
    }

    @GetMapping("/rooms/{roomId}/messages")
    public List<Message> getMessagesInRoom(@PathVariable("roomId") Long roomId){
        return messageService.findAllMessagesByRoom(roomId);
    }

}
