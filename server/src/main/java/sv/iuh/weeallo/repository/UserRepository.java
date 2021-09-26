package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.UserChat;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserChat, Long> {
    @Query("Select u from UserChat u where u.phone=:phone and u.password=:password")
    UserChat getLogin(@Param("phone") String phone, @Param("password") String pass);
    @Query("Select new UserChat(u.id,u.firstname,u.lastname,u.email,u.phone,u.avartar,u.coverImage) from UserChat u where u.phone like %:phone%")
    List<UserChat> searchFriend(@Param("phone") String phone);
    @Transactional
    @Modifying
    @Query(value="Insert into user_chat(phone,password,firstname,lastname) values (?1,?2,?3,?4)",nativeQuery = true)
    void userRegister(String phone,String password, String firstname, String lastname);
}
