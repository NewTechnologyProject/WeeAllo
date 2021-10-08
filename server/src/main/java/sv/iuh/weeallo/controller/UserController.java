package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.RoomChat;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.models.UserGroup;
import sv.iuh.weeallo.services.RoomChatService;
import sv.iuh.weeallo.services.UserService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private RoomChatService roomChatService;

    @GetMapping("/get-all-users")
    public List<UserChat> getAllUser() {
        return userService.getAllUser();
    }

    @PostMapping("/login/{phone}&{pass}")
    public UserChat getAllUser(@PathVariable("phone") String phone, @PathVariable("pass") String pass) {
        UserChat userChat=userService.getLogin(phone, pass);
        if(userChat != null){
            return new UserChat(userChat.getId(), userChat.getFirstname(), userChat.getLastname(),
                    userChat.getEmail(), userChat.getPhone(), userChat.getPassword(),userChat.getIsActive(),
                    userChat.getCreateAt(), userChat.getUpdateAt(), userChat.getAvartar(), userChat.getCoverImage(), userChat.getStatus());
        }
        return null;
    }


//    @PostMapping("/login/info/{phone}&{pass}")
//    public UserChat getLoginUser(@PathVariable("phone") String phone, @PathVariable("pass") String pass) {
//        UserChat userChat=userService.getLogin(phone, pass);
//        if(userChat != null){
//            return new UserChat(userChat.getId(), userChat.getFirstname(), userChat.getLastname(),
//                    userChat.getEmail(), userChat.getPhone(), userChat.getPassword(),userChat.getIsActive(),
//                    userChat.getCreateAt(), userChat.getUpdateAt(), userChat.getAvartar(), userChat.getCoverImage());
//        }
//        return null;
//    }

    @GetMapping("/{userId}/rooms")
    public List<RoomChat> getAllRoomByUser(@PathVariable("userId") Long userId){
        UserChat user = userService.getUserById(userId);
        List<RoomChat> listRoom = new ArrayList<RoomChat>();

        if(user != null){
            List<UserGroup> listUserGroup = user.getUserGroupList();
            if(listUserGroup.size() > 0){
                for(UserGroup ug : listUserGroup){
                    listRoom.add(new RoomChat(ug.getRoomChatId().getId(), ug.getRoomChatId().getCreator(),
                            ug.getRoomChatId().getRoomName(), ug.getRoomChatId().getCreateAt()));
                }
            }
        }

        return listRoom;
    }

    @GetMapping("/{userId}")
    public UserChat getUserById(@PathVariable("userId") Long userId){
        UserChat user = userService.getUserById(userId);
        return user;
    }

    @GetMapping("/get-user/{id}")
    public UserChat getUser(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @PostMapping("/register")
    public UserChat userRegister(@RequestBody UserChat userChat) {
        userService.userRegister(userChat);
        return userChat;
    }
    @PostMapping("/forgotpass")
    public UserChat userForgot(@RequestBody UserChat userChat){
        userService.userForgot(userChat);
        return userChat;
    }
}
