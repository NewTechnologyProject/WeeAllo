package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.roomChatId.id=:roomId")
    List<Message> getAllByRoom(@Param("roomId") Long roomId);

}
