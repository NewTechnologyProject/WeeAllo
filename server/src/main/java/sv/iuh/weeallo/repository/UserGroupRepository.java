package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.UserGroup;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    @Query("Select u from UserGroup u where u.userId.id=:userId")
    List<UserGroup> getAllByUser(@Param("userId") Long userId);

    @Query("Select u from UserGroup u where u.roomChatId.id=:roomId")
    List<UserGroup> getAllByRoom(@Param("roomId") Long roomId);

    @Transactional
    @Modifying
    @Query(value = "insert into user_group (room_chat_id, user_id, user_add) values (:roomId, :userId, :userAdd) ", nativeQuery = true)
    void addUserGroup(@Param("roomId") Long roomId, @Param("userId") Long userId, @Param("userAdd") Long userAddId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_group where room_chat_id=:roomId and user_id=:userId ", nativeQuery = true)
    void deleteUserGroup(@Param("roomId") Long roomId, @Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query(value = "delete from user_group where room_chat_id=:roomId ", nativeQuery = true)
    void deleteUserGroupByRoomId(@Param("roomId") Long roomId);
}
