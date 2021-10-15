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

//    @Modifying
//    @Transactional
//    @Query(value = "insert into room_chat (create_at, creator, room_name) value (:createAt, :creator, :roomName) ", nativeQuery = true)
//    void insertRommChat(@Param("createAt") String createAt, @Param("creator") Long creator,
//                            @Param("roomName") String roomName);

}
