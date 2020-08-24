package com.pwc.addressbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication(scanBasePackages = {"com.pwc.**"})
public class AddressBookApplication {
    public static void main(String[] args) {
        SpringApplication.run(AddressBookApplication.class, args);
    }
}
