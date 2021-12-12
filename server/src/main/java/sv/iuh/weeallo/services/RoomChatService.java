package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.MessageRepository;
import sv.iuh.weeallo.repository.RoomChatRepository;
import sv.iuh.weeallo.repository.UserGroupRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RoomChatService {
    private RoomChatRepository roomChatRepository;
    private UserGroupRepository userGroupRepository;
    private MessageRepository messageRepository;

    @Autowired
    public RoomChatService(RoomChatRepository roomChatRepository, UserGroupRepository userGroupRepository,
                           MessageRepository messageRepository) {
        this.roomChatRepository = roomChatRepository;
        this.userGroupRepository = userGroupRepository;
        this.messageRepository = messageRepository;
    }

    public RoomChat getById(Long roomId) {
        RoomChat roomChat = null;
        Optional<RoomChat> roomObj = roomChatRepository.findById(roomId);

        if (roomObj.isPresent()) {
            roomChat = roomObj.get();
        }

        return roomChat;
    }

    // Get lít messages
    public List<Message> getAllMessages(Long roomId) {
        RoomChat roomChat = null;
        Optional<RoomChat> roomObj = roomChatRepository.findById(roomId);
        List<Message> listMessage = new ArrayList<Message>();

        if (roomObj.isPresent()) {
            roomChat = roomObj.get();
        }

        if (roomChat != null) {
            return roomChat.getMessageList();
        }

        return null;
    }

    // Add room chat
    public RoomChat addRoom(RoomChat roomChat) {
        return roomChatRepository.save(roomChat);
    }

    // Get all members in room
    public List<UserGroup> getAllMembers(Long roomId) {
        List<UserGroup> userGroups = new ArrayList<UserGroup>();
        RoomChat room = getById(roomId);

        if (room != null) {
            userGroups = room.getUserGroupList();
        }

        return userGroups;
    }

    public void deleteRoomChatById(Long roomId) {
        try {
            roomChatRepository.deleteById(roomId);
            userGroupRepository.deleteUserGroupByRoomId(roomId);
            messageRepository.deleteMessageByRoomId(roomId);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }

    public void updateRoomChatCreator(Long roomId, Long creator) {
        roomChatRepository.updateRoomChatCreator(roomId, creator);
    }

    public void updateRoomChatInfo(Long roomId, String avatar, String roomName) {
        roomChatRepository.updateRoomInfo(roomId, roomName, avatar);
    }

}
