package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/{roomId}&{userId}")
    public void deleteUserGroup(@PathVariable("roomId") Long roomId, @PathVariable("userId") Long userId){
        userGroupService.deleteUserGroup(roomId,userId);
    }
    @GetMapping("/groups/{id}")
    public ResponseEntity<Integer> countGroup(@PathVariable("id") Long id){
        int groups = userGroupService.countGroup(id);
        return new ResponseEntity<Integer>(groups, HttpStatus.OK) ;
    }
}
