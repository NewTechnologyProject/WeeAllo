package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.UserGroupRepository;

@Service
public class UserGroupService {
    @Autowired
    private UserGroupRepository userGroupRepository;

    public void addUserGroup(UserGroup userGroup){
        userGroupRepository.addUserGroup(userGroup.getRoomChatId().getId(),userGroup.getUserId().getId());
    }

    public void deleteUserGroup(Long roomId, Long userId){
        userGroupRepository.deleteUserGroup(roomId,userId);
    }
}
