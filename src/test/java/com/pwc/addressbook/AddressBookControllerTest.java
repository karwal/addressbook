package com.pwc.addressbook;



import com.pwc.addressbook.dao.AddressBookRepository;
import com.pwc.addressbook.model.AddressBook;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import java.util.logging.Logger;

/**
 * @author Jagdeep Singh
 */
@RunWith(MockitoJUnitRunner.class)
public class AddressBookControllerTest {

	private Logger logger = Logger.getLogger(AddressBookControllerTest.class.getName());
	@Mock
	private AddressBookRepository addressBookRepository;

	@InjectMocks
	AddressBookController addressBookController = new AddressBookController();

	private AddressBook addressBook1;
	private AddressBook addressBook2;
	private AddressBook addressBook3;

	@Before
	public void before() {
		addressBook1 = new AddressBook("Google");
		addressBook2 = new AddressBook("Yahoo");
		addressBook3 = new AddressBook("Outlook");
	}

	@Test
	public void createTest() {
		try {
			Mockito.when(addressBookRepository.save(Mockito.any(AddressBook.class))).thenReturn(addressBook1);
			ResponseEntity<AddressBook> responseEntity = addressBookController.create(addressBook1);
			AddressBook addressBook = responseEntity.getBody();
			Assert.assertEquals("Google", addressBook.getName());
		} catch (EntityAlreadyExists entityAlreadyExists) {
			entityAlreadyExists.printStackTrace();
		}
	}

}
