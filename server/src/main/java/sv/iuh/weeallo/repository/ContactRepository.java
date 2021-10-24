package sv.iuh.weeallo.repository;

//import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Contact;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
    @Query("select c.id,c.sendId.id,c.receiveId.id,c.status from Contact c")
    List<Contact> allContact();

    @Query("select c from Contact c where c.sendId.id=:id1 and c.receiveId.id=:id2")
    Contact getContact(@Param("id1") Long id1,@Param("id2") Long id2);

    @Query("select c from Contact c where (c.sendId.id=:id or c.receiveId.id=:id) and c.status='friend'")
    List<Contact> getAllContact(@Param("id") Long id);

    @Query("select c from Contact c where c.sendId.id=:id and c.status='wait'")
    List<Contact> getSendContact(@Param("id") Long id);

    @Query("select c from Contact c where c.receiveId.id=:id and c.status='wait'")
    List<Contact> getReceiveContact(@Param("id") Long id);

    @Query("select c from Contact c where (c.sendId.id=:id1 and c.receiveId.id=:id2) or (c.sendId.id=:id2 and c.receiveId.id=:id1)")
    Contact getContactToDelete(@Param("id1") Long id1,@Param("id2") Long id2);

}
