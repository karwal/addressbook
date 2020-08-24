package com.pwc.addressbook;

import com.pwc.addressbook.dao.ContactRepository;
import com.pwc.addressbook.model.AggregateResults;
import com.pwc.addressbook.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping(value = "/v1/api/pwc")
public class ContactsController {

    private Logger logger = Logger.getLogger(ContactsController.class.getName());
    @Autowired
    ContactRepository contactRepository;


    @RequestMapping(value = "/contact/create")
    public ResponseEntity<Contact> create(@RequestBody Contact contact) throws EntityAlreadyExists {
        logger.info("Creating contact :" + contact.toString());

        List<Contact> contactListFromDb = contactRepository.findContactByName(contact.getContactName());
        if (contactListFromDb.size() > 0) {
            logger.warning("Contact already exists" + contact.getContactName());
            throw new EntityAlreadyExists(String.format("Contact %s already exists", contact.getContactName()));
        } else {
            logger.warning("Contact not found " + contact.getContactName());
        }

        Contact savedContact = contactRepository.save(contact);
        return new ResponseEntity<Contact>(savedContact, HttpStatus.OK);
    }

    @RequestMapping(value = "/contact")
    public ResponseEntity<List<Contact>> get(@RequestParam(required = false) String addressBookId, @RequestParam(required = false) Boolean unique) {
        List<Contact> contactList = null;
        if (unique != null && unique) {
            List<AggregateResults> aggregateResults = contactRepository.findUniqueContacts();
            logger.info("Total contacts found : " + aggregateResults.size());
            List<String> uniqueContactNames = new ArrayList<>();
            for (AggregateResults aggregateResult : aggregateResults) {
                if (aggregateResult.geCount() == 1) {
                    uniqueContactNames.add(aggregateResult.getContactName());
                    logger.info("Unique Contact Name : " + aggregateResult.getContactName());
                }
            }
            contactList = contactRepository.findContactsByName(uniqueContactNames);
        } else {
            contactList = contactRepository.findByAddressBookId(Long.parseLong(addressBookId));
        }
        return new ResponseEntity<List<Contact>>(contactList, HttpStatus.OK);
    }
}

