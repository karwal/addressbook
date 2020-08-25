package com.pwc.addressbook.dao;

import com.pwc.addressbook.model.AggregateResults;
import com.pwc.addressbook.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    @Query(value = "SELECT c FROM Contact c where c.addressBookId >= :addressBookId")
    List<Contact> findByAddressBookId(Long addressBookId);

    //@Query(value = "Select c.id as id, c.contact_name as contactName,  c.phone_number as phoneNumber FROM Contact c WHERE c.contact_name IN (SELECT contact_name FROM (SELECT contact_name, count(*) from contact GROUP BY contact_name having count(*) > 1))", nativeQuery = true)
    @Query(value = "SELECT new com.pwc.addressbook.model.AggregateResults(Count(*) as contactCount, contactName ) FROM Contact Group by contactName HAVING Count(*) = 1")
    List<AggregateResults> findUniqueContacts();

    @Query(value = "SELECT c FROM Contact c where c.contactName IN (:contactNames)")
    List<Contact> findContactsByName(List<String> contactNames);

    @Query(value = "SELECT c FROM Contact c where c.contactName = :contactName")
    List<Contact> findContactByName(String contactName);

    @Query(value = "SELECT c FROM Contact c where c.contactName = :contactName and c.addressBookId = :addressBookId")
    List<Contact>     findContactByNameAndAddressBook(String contactName, Long addressBookId);

}
