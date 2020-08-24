package com.pwc.addressbook.model;

public class AggregateResults {
    private String contactName;
    private Long count;

    public AggregateResults() {
    }

    public AggregateResults(Long count, String contactName) {
        this.contactName = contactName;
        this.count = count;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public Long geCount() {
        return count;
    }

    public void setCount(Long countcount) {
        this.count = count;
    }
}
