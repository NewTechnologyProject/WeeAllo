/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sv.iuh.weeallo.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


@Entity
@Table(name = "todo")
public class Todo implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "startTime")
    @Temporal(TemporalType.DATE)
    private Date startTime;
    @Column(name = "finishTime")
    @Temporal(TemporalType.DATE)
    private Date finishTime;
    @Column(name = "description")
    private String description;
    @Lob
    @Column(name = "usertodo")
    private String usertodo;
    @Column(name = "status")
    private String status;
    @JoinColumn(name = "roomChatId", referencedColumnName = "id")
    @ManyToOne
    private RoomChat roomChatId;
    @OneToMany(mappedBy = "toDoId")
    private List<ToDoUser> toDoUserList;

    public Todo() {
    }

    public Todo(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Date finishTime) {
        this.finishTime = finishTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUsertodo() {
        return usertodo;
    }

    public void setUsertodo(String usertodo) {
        this.usertodo = usertodo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public RoomChat getRoomChatId() {
        return roomChatId;
    }

    public void setRoomChatId(RoomChat roomChatId) {
        this.roomChatId = roomChatId;
    }

    public List<ToDoUser> getToDoUserList() {
        return toDoUserList;
    }

    public void setToDoUserList(List<ToDoUser> toDoUserList) {
        this.toDoUserList = toDoUserList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Todo)) {
            return false;
        }
        Todo other = (Todo) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Todo[ id=" + id + " ]";
    }
    
}
