import React, { Component } from "react";

const ReactDOM = require('react-dom');
const {parse, stringify} = require('flatted');
const client = require('./client');

class CreateAddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHandleAddressBookNameChange = this.onHandleAddressBookNameChange.bind(this);
    this.state= { addressBookName:'',
        serverErrorMessage: '',
        serverSuccessMessage: '',
        savedAddressBookName: ''
    };

    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled rejection (promise: ', event.promise, ', reason: ', event.reason, ').');
    });
  }


    onHandleAddressBookNameChange(e) {
        this.setState({
            addressBookName: e.target.value
           });
    }


    handleSubmit(e) {
		e.preventDefault();
		var event = e;

        var savedAddressBookName =e.target.addressBookName.value;
        if(savedAddressBookName == '') {
            alert('Address book name cannot be empty');
            return false;
        }
         try {
             var client = new XMLHttpRequest();
             var self = this;
             client.onreadystatechange = () => {
             if (client.readyState == 4) {
                // Typical action to be performed when the document is ready:
                console.log(client.responseText);
                console.log(client.status);
                console.log(savedAddressBookName);
                if(client.status ==200) {
                    var message = 'Address Book ' + savedAddressBookName + ' saved successfully';
                    this.setState({addressBookName:'', 'serverErrorMessage': '', 'serverSuccessMessage': message, 'savedAddressBookName':savedAddressBookName});
                } else {
                    var jsonResponse = JSON.parse(client.responseText);
                     console.log(jsonResponse);
                     this.setState({'serverErrorMessage': jsonResponse.message, 'serverSuccessMessage': ''});
                }
             }
         }
         client.open("POST", "/v1/api/pwc/addressbook/create", true);
         client.setRequestHeader("Content-Type", "application/json");
         client.setRequestHeader("Authorization", "abc123");
         client.send( JSON.stringify({"name" : e.target.addressBookName.value}));
        } catch(err) {
            console.log('client.responseText*************************');
            console.log(err);
        }

	}

  render() {

    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label for="addressBookName">
              Address Book Name:
              <input type="text" value={this.state.addressBookName} onChange={this.onHandleAddressBookNameChange} name="addressBookName" />
            </label>
            <input class="button" type="submit" value="Create Address Book" />
          </form>
          <div class="errorLabel">{this.state.serverErrorMessage}</div>
          <div>{this.state.serverSuccessMessage}</div>
      </div>
    );
  }
}
 
export default CreateAddressBook;