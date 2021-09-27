package sv.iuh.weeallo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.UserGroup;

import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    @Query("Select u from UserGroup u where u.userId.id=:userId")
    List<UserGroup> getAllByUser(@Param("userId") Long userId);

    @Query("Select u from UserGroup u where u.roomChatId.id=:roomId")
    List<UserGroup> getAllByRoom(@Param("roomId") Long roomId);
}
