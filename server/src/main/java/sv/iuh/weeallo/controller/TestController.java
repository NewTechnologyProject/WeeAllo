package sv.iuh.weeallo.controller;

import org.springframework.web.bind.annotation.*;
import sv.iuh.weeallo.models.RoomChat;

@CrossOrigin
@RestController
public class TestController {
    @GetMapping("/")
    public String getRoomById(Long roomId) {
        return "Hello WeeAloo";
    }
}
