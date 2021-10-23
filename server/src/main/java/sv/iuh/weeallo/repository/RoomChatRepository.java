package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Message;
import sv.iuh.weeallo.models.RoomChat;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface RoomChatRepository extends JpaRepository<RoomChat, Long> {

    @Modifying
    @Transactional
    @Query(value = "update room_chat set creator=:creator where id=:roomId ", nativeQuery = true)
    void updateRoomChatCreator(@Param("roomId") Long roomId, @Param("creator") Long creator);

}
