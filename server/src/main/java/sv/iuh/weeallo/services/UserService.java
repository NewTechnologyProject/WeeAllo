package sv.iuh.weeallo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.iuh.weeallo.models.UserChat;
import sv.iuh.weeallo.repository.UserRepository;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<UserChat> getAllUser() {
        return userRepository.getAllUser();
    }
    public  UserChat getLogin(String phone, String pass){
        return  userRepository.getLogin(phone,pass);
    }
<<<<<<< HEAD
    public UserChat getById(Long id){
        return userRepository.findContactById(id);
    }
=======
    public void userRegister(String phone,String password,String firstname,String lastname){
         userRepository.userRegister(phone,password,firstname,lastname);
    }

>>>>>>> d8cd84bea923e4c0b98a8a1232ae283dd06df693
}
