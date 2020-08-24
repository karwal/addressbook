import React, { Component } from "react";

const ReactDOM = require('react-dom'); // <2>
const {parse, stringify} = require('flatted');
const client = require('./client');


class ViewContactList extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onHandleContactNameChange = this.onHandleContactNameChange.bind(this);
        this.onHandleContactPhoneNumberChange = this.onHandleContactPhoneNumberChange.bind(this);
        this.state= {contactList:[], contactName:'', contactPhoneNumber:'', responseStatus: 0};
      }

  onHandleContactNameChange(e) {
    this.setState({
      contactName: e.target.value
    });
  }

  onHandleContactPhoneNumberChange(e) {
      this.setState({
        contactPhoneNumber: e.target.value
      });
    }

    handleSubmit(e) {
        e.preventDefault();

        if(e.target.contactName.value == '' || e.target.contactPhoneNumber.value =='') {
            alert('Contact Name or Phone number cannot be empty');
            return false;
        }

        const urlParams = new URLSearchParams(window.location.href);
        const addressBookId = urlParams.get('id');
        var savedContactName = e.target.contactName.value;

         try {
             var client = new XMLHttpRequest();
             var self = this;
             client.onreadystatechange = () => {
             if (client.readyState == 4) {
                // Typical action to be performed when the document is ready:
                console.log(client.responseText);
                console.log(client.status);
                if(client.status ==200) {
                    var message = 'Contact ' + savedContactName + ' saved successfully';
                    this.setState({'contactName': '', 'contactPhoneNumber': '', 'afterSave':true, 'responseStatus':client.status, 'serverMessage': message, 'savedContactName':savedContactName});
                    this.handleContactCreate();
                } else {
                    var jsonResponse = JSON.parse(client.responseText);
                     console.log(jsonResponse);
                     this.setState({savedContactName:'', 'afterSave':true, 'responseStatus':client.status, 'serverMessage': jsonResponse.message});
                }
             }
         }
         client.open("POST", "/v1/api/pwc/contact/create", true);
         client.setRequestHeader("Content-Type", "application/json");
         client.setRequestHeader("Authorization", "abc123");
         client.send( JSON.stringify({'contactName' : e.target.contactName.value, 'phoneNumber': e.target.contactPhoneNumber.value, 'addressBookId' : addressBookId}));
        } catch(err) {
            console.log('client.responseText*************************');
            console.log(err);
        }

//        client({
//        method: 'POST',
//        path: '/v1/api/pwc/contact/create',
//        entity: {'contactName' : e.target.contactName.value, 'phoneNumber': e.target.contactPhoneNumber.value, 'addressBookId' : addressBookId},
//        headers: {'Content-Type': 'application/json', 'Authorization' : 'abc123'}
//        }).done(response => {
//                    console.log(response);
//                    this.handleContactCreate();
//                });
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.href);
        const addressBookId = urlParams.get('id');

        client({
        method: 'POST',
        path: '/v1/api/pwc/contact?addressBookId=' + addressBookId,
        headers: {'Content-Type': 'application/json' , 'Authorization' : 'abc123'}
        }).done(response => {
                    console.log(response.entity);
        			this.setState({contactList:response.entity, contactName:'', contactPhoneNumber:'', 'afterSave' : false});
        		});
    }

    handleContactCreate() {
        const urlParams = new URLSearchParams(window.location.href);
        const addressBookId = urlParams.get('id');

        client({
        method: 'POST',
        path: '/v1/api/pwc/contact?addressBookId=' + addressBookId,
        headers: {'Content-Type': 'application/json' , 'Authorization' : 'abc123'}
        }).done(response => {
                    console.log(response.entity);
                    this.setState({contactList:response.entity, contactName:'', contactPhoneNumber:'', 'afterSave' : true});
                });
    }
    render() {

    const urlParams = new URLSearchParams(window.location.href);
    const addressBookId = urlParams.get('id');
    const urlParams2 = new URLSearchParams(window.location.href);
    const addressBookName = urlParams.get('addressBookName');
    console.log('addressBookId' + addressBookId);
    console.log('addressBookName' + addressBookName);
    let savedlabel;
    if (this.state.responseStatus == 200) {
        savedlabel = <div><label for="display">{this.state.serverMessage}</label></div>
    } else if (this.state.responseStatus >0 ) {
        savedlabel = <div><label for="display" class="errorLabel">{this.state.serverMessage}</label></div>
    } else {
        savedlabel = <div><label for="display"> </label></div>
    }
    return (

      <div>
        <h2>{"Contact  List for Address Book : " + addressBookName}</h2>
            <div>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Contact Name:</label>
                        <input type="text" name="contactName" value={this.state.contactName} onChange={this.onHandleContactNameChange}/>
                    </div>
                    <div>
                        <label>Phone Number:</label>
                        <input type="text" type="number" min="1" step="1" name="contactPhoneNumber" value={this.state.contactPhoneNumber} onChange={this.onHandleContactPhoneNumberChange}/>
                    </div>
                    <div>
                        <input class="button" type="submit" value="Create Contact" />
                    </div>
                  </form>
            </div>
        <div>
            <ContactList contactList={this.state.contactList}/>
        </div>
        <div>
            {savedlabel}
        </div>
       </div>
    );
    }
}

class ContactList extends React.Component {
    constructor(props) {
		super(props);
	}


	render() {
        const contacts = this.props.contactList.map(contact =>
                    <Contact key={contact.id} id={contact.id}  phoneNumber={contact.phoneNumber} contactName={contact.contactName}/>
        );
        return (
        <div>

            <div>
                <table class="table70">
                    <tbody>
                        <tr>
                            <th>Contact Id</th>
                            <th>Contact Name</th>
                            <th>Contact Phone Number</th>
                        </tr>
                        {contacts}
                    </tbody>
                </table>
            </div>
        </div>
            )
	}
}

class Contact extends React.Component {
    constructor(props) {
	   super(props);
	}

	render() {
    		return (
    			<tr>
    				<td>{this.props.id}</td>
    				<td>{this.props.contactName}</td>
    				<td>{this.props.phoneNumber}</td>
    			</tr>
    		)
    	}
}
export default ViewContactList;