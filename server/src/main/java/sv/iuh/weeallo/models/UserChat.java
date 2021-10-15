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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "userChat")
public class UserChat implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "firstname")
    private String firstname;
    @Column(name = "lastname")
    private String lastname;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "password")
    private String password;
    @Column(name = "isActive")
    private String isActive;
    @Column(name = "createAt")
    @Temporal(TemporalType.DATE)
    private Date createAt;
    @Column(name = "updateAt")
    @Temporal(TemporalType.DATE)
    private Date updateAt;
    @Column(name = "avartar")
    private String avartar;
    @Column(name = "coverImage")
    private String coverImage;
    @Column(name = "status")
    private String status;
    @OneToMany(mappedBy = "sendId")
    private List<Contact> contactList;
    @OneToMany(mappedBy = "receiveId")
    private List<Contact> contactList1;
    @OneToMany(mappedBy = "userId")
    private List<Message> messageList;
    @OneToMany(mappedBy = "userId")
    private List<UserGroup> userGroupList;

    public UserChat() {
    }


    public UserChat(Long id, String firstname, String lastname, String email, String phone, String avartar, String coverImage, String status) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.avartar = avartar;
        this.coverImage = coverImage;
        this.status = status;
    }

    public UserChat(Long id, String firstname, String lastname, String password, String phone, String avartar, String coverImage) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.phone = phone;
        this.avartar = avartar;
        this.coverImage = coverImage;
    }

    public UserChat(Long id, String firstname, String lastname, String email, String phone, String password, String isActive, Date createAt, Date updateAt, String avartar, String coverImage, String status) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.isActive = isActive;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.avartar = avartar;
        this.coverImage = coverImage;
        this.status = status;
    }

//    public UserChat(Long id, String firstname, String lastname, String phone ,String avartar, String coverImage) {
//        this.id = id;
//        this.firstname = firstname;
//        this.lastname = lastname;
//        this.phone = phone;
//        this.avartar = avartar;
//        this.coverImage = coverImage;
//
//    }

    public UserChat(Long id, String password) {
        this.id = id;
        this.password = password;
    }

    public UserChat(Long id) {
        this.id = id;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIsActive() {
        return isActive;
    }

    public void setIsActive(String isActive) {
        this.isActive = isActive;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getAvartar() {
        return avartar;
    }

    public void setAvartar(String avartar) {
        this.avartar = avartar;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }

    public List<Contact> getContactList() {
        return contactList;
    }

    public void setContactList(List<Contact> contactList) {
        this.contactList = contactList;
    }

    public List<Contact> getContactList1() {
        return contactList1;
    }

    public void setContactList1(List<Contact> contactList1) {
        this.contactList1 = contactList1;
    }

    public List<Message> getMessageList() {
        return messageList;
    }

    public void setMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }

    public List<UserGroup> getUserGroupList() {
        return userGroupList;
    }

    public void setUserGroupList(List<UserGroup> userGroupList) {
        this.userGroupList = userGroupList;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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
        if (!(object instanceof UserChat)) {
            return false;
        }
        UserChat other = (UserChat) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.UserChat[ id=" + id + " ]";
    }
    
}
