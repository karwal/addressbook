package com.pwc.addressbook.dao;


import com.pwc.addressbook.model.AddressBook;
import com.pwc.addressbook.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AddressBookRepository  extends JpaRepository<AddressBook, Long> {


    @Query(value = "SELECT a FROM AddressBook a where a.name = :addressBookName")
    List<AddressBook> findAddressBookByName(String addressBookName);
}
