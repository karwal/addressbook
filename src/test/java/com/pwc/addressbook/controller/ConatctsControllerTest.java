package com.pwc.addressbook.controller;



import com.pwc.addressbook.controller.exception.EntityAlreadyExists;
import com.pwc.addressbook.dao.ContactRepository;
import com.pwc.addressbook.model.Contact;
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
public class ConatctsControllerTest {

	private Logger logger = Logger.getLogger(ConatctsControllerTest.class.getName());
	@Mock
	private ContactRepository contactRepository;

	@InjectMocks
	ContactsController contactsController = new ContactsController();

	private Contact contact;

	@Before
	public void before() {
		contact = new Contact(1L, "Jagdeep","0444333222");
	}

	@Test
	public void createTest() {
		try {
			Mockito.when(contactRepository.save(Mockito.any(Contact.class))).thenReturn(contact);
			ResponseEntity<Contact> responseEntity = contactsController.create(contact);
			Contact contact = responseEntity.getBody();
			Assert.assertEquals("Jagdeep", contact.getContactName());
			Assert.assertEquals("0444333222", contact.getPhoneNumber());
		} catch (EntityAlreadyExists entityAlreadyExists) {
			entityAlreadyExists.printStackTrace();
		}
	}

}
