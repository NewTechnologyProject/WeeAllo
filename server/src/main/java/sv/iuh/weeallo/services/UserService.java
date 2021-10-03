package sv.iuh.weeallo.services;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserChat> getAllUser() {
        return userRepository.getAllUser();
    }

    public UserChat getLogin(String phone, String pass) {
        return userRepository.getLogin(phone, pass);
    }

    public UserChat getById(Long id) {
        return userRepository.findContactById(id);
    }

    public UserChat userRegister(UserChat userChat) {
        return userRepository.save(userChat);
    }

    public UserChat getUserById(Long userId){
        Optional<UserChat> userObj = userRepository.findById(userId);
        if(userObj.isPresent()){
            return userObj.get();
        }
        return  null;
    }
}
