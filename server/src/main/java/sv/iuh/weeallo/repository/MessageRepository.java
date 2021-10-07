package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Message;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.roomChatId.id=:roomId")
    List<Message> getAllByRoom(@Param("roomId") Long roomId);

    @Query("SELECT m FROM Message m WHERE m.userId = :userId ORDER BY m.id DESC ")
    List<Message> findMessagesByUser(@Param("userId") Long userId);
}
