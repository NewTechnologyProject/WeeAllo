package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.services.MessageService;
import sv.iuh.weeallo.services.RoomChatService;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
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
        List<Message> listMessages = roomChatService.getAllMessages(roomId);
        List<Message> newListMessages = new ArrayList<Message>();

        if(listMessages != null && listMessages.size() >0){
            for(Message message : listMessages){
                RoomChat roomChat = new RoomChat(message.getRoomChatId().getId(), message.getRoomChatId().getCreator(),
                        message.getRoomChatId().getRoomName(), message.getRoomChatId().getCreateAt());

                UserChat user = new UserChat(message.getUserId().getId(), message.getUserId().getFirstname(),
                        message.getUserId().getLastname(), message.getUserId().getEmail(), message.getUserId().getPhone(),
                        message.getUserId().getPassword(),message.getUserId().getIsActive(),
                        message.getUserId().getCreateAt(), message.getUserId().getUpdateAt(), message.getUserId().getAvartar(),
                        message.getUserId().getCoverImage(), message.getUserId().getStatus());

                newListMessages.add(new Message(message.getId(), message.getStatus(), message.getContent(), roomChat, user));
            }
        }

        return newListMessages;
    }

    @PostMapping(value="/room")
    public RoomChat creaRoomChat(@RequestBody RoomChat roomChat) {
        //TODO: process POST request
        
        return roomChatService.addRoomChat(roomChat);
    }
    
}
