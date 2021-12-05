package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.UserGroupRepository;

import java.util.List;

@Service
public class UserGroupService {
    @Autowired
    private UserGroupRepository userGroupRepository;

    public void addUserGroup(UserGroup userGroup){
        Long userAddId = null;
        if(userGroup.getUserAdd() != null){
            userAddId = userGroup.getUserAdd().getId();
        }
        userGroupRepository.addUserGroup(userGroup.getRoomChatId().getId(),userGroup.getUserId().getId(), userAddId);
    }

    public void deleteUserGroup(Long roomId, Long userId){
        userGroupRepository.deleteUserGroup(roomId,userId);
    }

    public int countGroup(Long id){
        List<UserGroup> list= userGroupRepository.getAllByUser(id);
        int groups = list.size();
        return groups;
    }
}
