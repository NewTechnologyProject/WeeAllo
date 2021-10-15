package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.repository.UserGroupRepository;
import sv.iuh.weeallo.services.UserGroupService;

@CrossOrigin
@RestController
@RequestMapping("/api/usergroups")
public class UserGoupController {
    @Autowired
    private UserGroupService userGroupService;

    @PostMapping("/")
    public void addUserGroup(@RequestBody UserGroup userGroup){
        try{
            userGroupService.addUserGroup(userGroup);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
