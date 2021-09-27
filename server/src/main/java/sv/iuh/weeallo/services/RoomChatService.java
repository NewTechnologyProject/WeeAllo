package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.RoomChatRepository;
import sv.iuh.weeallo.repository.UserGroupRepository;

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
        return roomChatRepository.getById(roomId);
    }


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
}
