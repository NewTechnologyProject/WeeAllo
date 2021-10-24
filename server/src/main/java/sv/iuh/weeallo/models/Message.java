/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sv.iuh.weeallo.models;

import java.io.Serializable;
import java.util.Date;
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
@Table(name = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "status")
    private String status;
    @Column(name="file")
    private String file;
    @Column(name="media")
    private String media;
    @Column(name = "time")
    private Date time;
    @Column(name="content")
    private String content;
    @JoinColumn(name = "roomChatId", referencedColumnName = "id")
    @ManyToOne
    private RoomChat roomChatId;
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @ManyToOne
    private UserChat userId;

    public Message() {
    }

    public Message(Long id, String status, String file, String media, Date time, String content, RoomChat roomChatId, UserChat userId) {
        this.id = id;
        this.status = status;
        this.file = file;
        this.media = media;
        this.time = time;
        this.content = content;
        this.roomChatId = roomChatId;
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Message(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public UserChat getUserId() {
        return userId;
    }

    public void setUserId(UserChat userId) {
        this.userId = userId;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
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
        if (!(object instanceof Message)) {
            return false;
        }
        Message other = (Message) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Message[ id=" + id + " ]";
    }
    
}
