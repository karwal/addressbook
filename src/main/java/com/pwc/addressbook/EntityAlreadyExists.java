package com.pwc.addressbook;

public class EntityAlreadyExists extends Exception {

    public EntityAlreadyExists(String message) {
        super(message);
    }
}
