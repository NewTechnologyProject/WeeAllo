package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;

import java.util.List;

@Repository
public interface RoomChatRepository extends JpaRepository<RoomChat, Long> {
}
