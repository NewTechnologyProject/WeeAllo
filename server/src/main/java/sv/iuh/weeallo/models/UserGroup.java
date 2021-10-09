/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sv.iuh.weeallo.models;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "userGroup")
public class UserGroup implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @JoinColumn(name = "roomChatId", referencedColumnName = "id")
    @ManyToOne
    private RoomChat roomChatId;
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @ManyToOne
    private UserChat userId;

    public UserGroup() {
    }

    public UserGroup(RoomChat roomChatId, UserChat userId) {
        this.roomChatId = roomChatId;
        this.userId = userId;
    }

    public UserGroup(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoomChat getRoomChatId() {
        return roomChatId;
    }

    public void setRoomChatId(RoomChat roomChatId) {
        this.roomChatId = roomChatId;
    }

    public UserChat getUserId() {
        return userId;
    }

    public void setUserId(UserChat userId) {
        this.userId = userId;
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
        if (!(object instanceof UserGroup)) {
            return false;
        }
        UserGroup other = (UserGroup) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.UserGroup[ id=" + id + " ]";
    }
    
}
