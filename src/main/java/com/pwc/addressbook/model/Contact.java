package com.pwc.addressbook.model;

import javax.persistence.*;

@Entity
@Table(name="CONTACT")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long addressBookId;
    private String contactName;
    private String phoneNumber;

    public Contact() {
    }

    public Contact(Long id, String contactName, String phoneNumber) {
        this.id = id;
        this.contactName = contactName;
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAddressBookId() {
        return addressBookId;
    }

    public void setAddressBookId(Long addressBookId) {
        this.addressBookId = addressBookId;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", addressBookId=" + addressBookId +
                ", contactName='" + contactName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
