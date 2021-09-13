package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.UserChat;

@Repository
public interface UserRepository extends JpaRepository<UserChat, Long> {
}
