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

    @Query("Select new UserChat(u.id,u.firstname,u.lastname,u.email,u.phone,u.avartar,u.coverImage,u.status) from UserChat u")
    List<UserChat> getAllUser();

    @Query("Select new UserChat(u.id,u.firstname,u.lastname,u.email,u.phone,u.avartar,u.coverImage) from UserChat u where u.id = :id")
    UserChat filterContact(@Param("id") Long id);

    @Query("Select new UserChat(u.id,u.firstname,u.lastname,u.email,u.phone,u.avartar,u.coverImage,u.status) from UserChat u where u.id=:id")
    UserChat findContactById(@Param("id") Long id);

    @Query("Select new UserChat(u.id,u.firstname,u.lastname,u.email,u.phone,u.avartar,u.coverImage,u.status) from UserChat u where u.phone =:phone")
    UserChat findContactByPhone(@Param("phone") String phone);
}

