package sv.iuh.weeallo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.services.UserService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get-all-users")
    public List<UserChat> getAllUser() {
        return userService.getAllUser();
    }

    @PostMapping("/login/{phone}&{password}")
    public UserChat userLogin(@PathVariable("phone") String phone, @PathVariable("password") String pass) {
        UserChat userChat = userService.getLogin(phone, pass);
        if (userChat == null) {
            return null;
        } else {
            return userChat;
        }
    }

    @GetMapping("/get-user/{id}")
    public UserChat getUser(@PathVariable("id") Long id) {
        return userService.getById(id);
    }

    @PostMapping("/register/{phone}&{password}&{firstname}&{lastname}")
    public String userRegister(@PathVariable("phone") String phone, @PathVariable("password") String password,
            @PathVariable("firstname") String firstname, @PathVariable("lastname") String lastname) {
        userService.userRegister(phone, password, firstname, lastname);
        return "register successfully";
    }
}
