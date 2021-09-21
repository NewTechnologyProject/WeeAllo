package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.UserChat;

@Repository
public interface UserRepository extends JpaRepository<UserChat, Long> {
    @Query("Select u from UserChat u where u.phone=:phone and u.password=:password")
    UserChat getLogin(@Param("phone") String phone, @Param("password") String pass);
}
