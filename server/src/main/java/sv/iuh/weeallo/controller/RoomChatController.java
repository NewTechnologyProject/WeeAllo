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

@CrossOrigin
@RestController
@RequestMapping("/api/rooms")
public class RoomChatController {
    @Autowired
    private RoomChatService roomChatService;
    @Autowired
    private MessageService messageService;

    @GetMapping("/{roomId}")
    public RoomChat getRoomById(@PathVariable("roomId") Long roomId){
        return roomChatService.getById(roomId);
    }

    @GetMapping("/{roomId}/messages")
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

    @PostMapping ("/")
    public void addRoomChat(@RequestBody RoomChat roomChat){
        roomChatService.addRoomChat(roomChat);

    }

}
