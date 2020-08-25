package com.pwc.addressbook.controller;

import com.pwc.addressbook.controller.exception.EntityAlreadyExists;
import com.pwc.addressbook.dao.AddressBookRepository;
import com.pwc.addressbook.model.AddressBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

/**
 * @author Jagdeep Singh
 */

@RestController
@RequestMapping(value = "/v1/api/pwc")
public class AddressBookController {

	private Logger logger = Logger.getLogger(AddressBookController.class.getName());
	@Autowired
	AddressBookRepository addressBookRepository;

	@RequestMapping(value = "/addressbook/create")
	public ResponseEntity<AddressBook> create(@RequestBody AddressBook addressBook) throws EntityAlreadyExists {
		List<AddressBook>  addressBookListFromDb = addressBookRepository.findAddressBookByName(addressBook.getName());
		if(addressBookListFromDb.size() > 0) {
			logger.info("Address book already exists" + addressBook.toString());
			throw new EntityAlreadyExists(String.format("Address book %s already exists", addressBook.getName()));
		}
		logger.info("Creating address book" + addressBook.toString());
		AddressBook savedAddressBook = addressBookRepository.save(addressBook);
		return new ResponseEntity<AddressBook>(savedAddressBook, HttpStatus.OK);
	}

	@RequestMapping(value = "/addressbook")
	public ResponseEntity<List<AddressBook>> get() {
		List<AddressBook> addressBookList = addressBookRepository.findAll();
		return new ResponseEntity<List<AddressBook>>(addressBookList, HttpStatus.OK);
	}
}
