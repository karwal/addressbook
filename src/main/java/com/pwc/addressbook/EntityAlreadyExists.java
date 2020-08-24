package com.pwc.addressbook;

import jdk.vm.ci.meta.ExceptionHandler;

public class EntityAlreadyExists extends Exception {

    public EntityAlreadyExists(String message) {
        super(message);
    }
}
