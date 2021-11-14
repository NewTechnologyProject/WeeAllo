package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.Contact;
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

    @GetMapping("/phone/{dt}")
    public UserChat getUserByPhone(@PathVariable("dt") String dt) {
        return userService.getUserChatByPhone(dt);
    }
    // @PostMapping("/login/{phone}&{pass}")
    // public UserChat getAllUser(@PathVariable("phone") String phone,
    // @PathVariable("pass") String pass) {
    // UserChat userChat=userService.getLogin(phone, pass);
    // if(userChat != null){
    // return sliceUser(userChat);
    // }
    // return null;
    // }

    @PostMapping("/login/{phone}&{pass}")
    public UserChat userLogin(@PathVariable("phone") String phone, @PathVariable("pass") String pass) {

        if (userService.getUserChatByPhone(phone) == null) {
            return null;
        } else {
            UserChat userChat = userService.getUserChatByPhone(phone);
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            if (bCryptPasswordEncoder.matches(pass, userChat.getPassword()) == true) {
                return userService.getUserChatByPhone(phone);
                // return userService.getLogin(phone,pass);
            } else
                return null;
        }
    }

    @GetMapping("/{userId}/rooms")
    public List<RoomChat> getAllRoomByUser(@PathVariable("userId") Long userId) {
        UserChat user = userService.getUserById(userId);
        List<RoomChat> listRoom = new ArrayList<>();

        if (user != null) {
            List<UserGroup> listUserGroup = user.getUserGroupList();
            if (listUserGroup.size() > 0) {
                for (UserGroup ug : listUserGroup) {
                    RoomChat roomChat = new RoomChat(ug.getRoomChatId().getId(), ug.getRoomChatId().getCreator(),
                            ug.getRoomChatId().getRoomName(), ug.getRoomChatId().getCreateAt(),
                            ug.getRoomChatId().getAvatar());


                    listRoom.add(roomChat);
                }
            }
        }

        return listRoom;
    }

    @GetMapping("/{userId}/friends")
    public List<UserChat> getAllContatc(@PathVariable("userId") Long userId) {
        UserChat user = userService.getUserById(userId);
        List<Contact> contacts = new ArrayList<Contact>();
        List<Contact> contacts1 = new ArrayList<Contact>();
        List<UserChat> friends = new ArrayList<UserChat>();

        if (user != null) {
            contacts = user.getContactList();
            contacts1 = user.getContactList1();

            if (contacts != null && contacts.size() > 0) {
                friends.addAll(getFriends(userId, contacts));
            }
            if (contacts1 != null && contacts1.size() > 0) {
                friends.addAll(getFriends(userId, contacts1));
            }
        }

        return friends;
    }

    @GetMapping("/{userId}")
    public UserChat getUserById(@PathVariable("userId") Long userId) {
        UserChat user = userService.getUserById(userId);
        return user;
    }

    @GetMapping("/get-user/{id}")
    public UserChat getUser(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @PostMapping("/register")
    public UserChat userRegister(@RequestBody UserChat userChat) {
        userChat.setPassword(new BCryptPasswordEncoder().encode(userChat.getPassword()));
        userService.userRegister(userChat);
        return userChat;
    }

    @PostMapping("/forgotpass/{phone}&&{newpass}")
    public boolean userForgot(@PathVariable("phone") String phone, @PathVariable("newpass") String newPass) {
        return userService.userForgot(phone, newPass);
    }

    // get list friends
    public List<UserChat> getFriends(Long userId, List<Contact> listContacts) {
        List<UserChat> users = new ArrayList<UserChat>();
        for (Contact c : listContacts) {
            if (c.getStatus().equalsIgnoreCase("friend")) {
                if (c.getReceiveId().getId() == userId) {
                    users.add(sliceUser(c.getSendId()));
                } else {
                    users.add(sliceUser(c.getReceiveId()));
                }

            }
        }
        return users;
    }

    // Slice user
    public UserChat sliceUser(UserChat userChat) {
        return new UserChat(userChat.getId(), userChat.getFirstname(), userChat.getLastname(), userChat.getEmail(),
                userChat.getPhone(), userChat.getPassword(), userChat.getIsActive(), userChat.getCreateAt(),
                userChat.getUpdateAt(), userChat.getAvartar(), userChat.getCoverImage(), userChat.getStatus());
    }

     @GetMapping("/detail/{id}")
     public UserChat findUserDetailById(@PathVariable("id") Long id) {
         return userService.getUserDetailById(id);
     }

     @PutMapping("/detail/{id}")
     public UserChat updateUserChat(@RequestBody UserChat userChatDetail, @PathVariable("id") Long id) {
         UserChat userChat = userService.getUserDetailById(id);
         if (userChatDetail.getFirstname() != null) {
             userChat.setFirstname(userChatDetail.getFirstname());
         }
         if (userChatDetail.getLastname() != null) {
             userChat.setLastname(userChatDetail.getLastname());
         }
         if (userChatDetail.getBirthday() != null) {
             userChat.setBirthday(userChatDetail.getBirthday());
         }
         if (userChatDetail.getGender() != null) {
             userChat.setGender(userChatDetail.getGender());
         }

         if (userChatDetail.getAvartar() != null) {
             userChat.setAvartar(userChatDetail.getAvartar());
         }
         if (userChatDetail.getPassword() != null) {
             userChat.setPassword(new BCryptPasswordEncoder().encode(userChatDetail.getPassword()));
         }
         if (userChatDetail.getCoverImage() != null) {
             userChat.setCoverImage(userChatDetail.getCoverImage());
         }
         userService.saveUserChat(userChat);
         return userChat;
     }
     @GetMapping("/get-all-phones")
     public List<UserChat> getAllPhone(){
        return  userService.getAllPhone();
     }


}
