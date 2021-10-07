package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.RoomChatRepository;
import sv.iuh.weeallo.repository.UserGroupRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomChatService {
    private RoomChatRepository roomChatRepository;
    private UserGroupRepository userGroupRepository;

    @Autowired
    public RoomChatService(RoomChatRepository roomChatRepository, UserGroupRepository userGroupRepository) {
        this.roomChatRepository = roomChatRepository;
        this.userGroupRepository = userGroupRepository;
    }

    public RoomChat getById(Long roomId) {
        RoomChat roomChat =null;
        Optional<RoomChat> roomObj = roomChatRepository.findById(roomId);

        if(roomObj.isPresent()){
            roomChat = roomObj.get();
        }

        return roomChat;
    }

    //Get lít message
    public List<Message> getAllMessages(Long roomId){
        RoomChat roomChat =null;
        Optional<RoomChat> roomObj = roomChatRepository.findById(roomId);
        List<Message> listMessage = new ArrayList<Message>();

        if(roomObj.isPresent()){
            roomChat = roomObj.get();
        }

        if(roomChat != null){
            return roomChat.getMessageList();
        }

        return null;
    }

    //Get all user
    public List<RoomChat> getAllByUser(Long userId) {
        List<UserGroup> listUserGroup = userGroupRepository.getAllByUser(userId);
        List<RoomChat> listRoomChat = null;

        if(listUserGroup.size() > 0){
            for(UserGroup u: listUserGroup){
                Optional<RoomChat> odj = roomChatRepository.findById(u.getUserId().getId());
                if(odj.isPresent()){
                    listRoomChat.add(odj.get());
                }
            }
        }
        return listRoomChat;
    }

    //Add room chat
    public void addRoomChat(RoomChat roomChat){
        roomChatRepository.insertRommChat(roomChat.getCreateAt(),roomChat.getCreator(), roomChat.getRoomName());
    }

}
