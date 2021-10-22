package sv.iuh.weeallo.controller;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.services.MessageService;
import sv.iuh.weeallo.services.RoomChatService;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
                        message.getRoomChatId().getRoomName(), message.getRoomChatId().getCreateAt(),
                        message.getRoomChatId().getAvatar());

                UserChat user = sliceUser(message.getUserId());

                newListMessages.add(new Message(message.getId(), message.getStatus(), message.getContent(), roomChat, user));
            }
        }

        return newListMessages;
    }

    @PostMapping ("/")
    public RoomChat addRoomChat(@RequestBody RoomChat roomChat){
        return roomChatService.addRoom(roomChat);
    }

    @GetMapping("/{roomId}/users")
    public  List<UserChat> getListMembers (@PathVariable("roomId") Long roomId){
        List<UserChat> members = new ArrayList<UserChat>();
        List<UserGroup> userGroups = roomChatService.getAllMembers(roomId);

        if(userGroups.size() > 0){
            for (UserGroup ug : userGroups){
                UserChat user = sliceUser(ug.getUserId());
                members.add(user);
            }
        }
        return members;
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoomById(@PathVariable("roomId") Long roomId){
        roomChatService.deleteRoomChatById(roomId);
    }

    @PutMapping("/{roomId}&{creator}")
    public void updateRoomChatCreator(@PathVariable("roomId") Long roomId, @PathVariable("creator") Long creator){
        roomChatService.updateRoomChatCreator(roomId, creator);
    }

    @PostMapping(value="/room")
    public RoomChat creaRoomChat(@RequestBody RoomChat roomChat) {
        //TODO: process POST request
        
        return roomChatService.addRoom(roomChat);
    }

    //Slice user
    public UserChat sliceUser(UserChat userChat){
        return new UserChat(userChat.getId(), userChat.getFirstname(), userChat.getLastname(),
                userChat.getEmail(), userChat.getPhone(), userChat.getPassword(),userChat.getIsActive(),
                userChat.getCreateAt(), userChat.getUpdateAt(), userChat.getAvartar(), userChat.getCoverImage(),
                userChat.getStatus());
    }

}
