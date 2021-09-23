package sv.iuh.weeallo.repository;

import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sv.iuh.weeallo.models.Contact;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
    @Query("select c.id,c.sendId.id,c.receiveId.id,c.status from Contact c")
    List<Contact> allContact();

}
