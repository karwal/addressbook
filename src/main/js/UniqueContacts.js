import React, { Component } from "react";

const ReactDOM = require('react-dom'); // <2>
const {parse, stringify} = require('flatted');
const client = require('./client');


class UniqueContactsList extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state= {contactList:[], contactName:'', contactPhoneNumber:''};
      }



    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.href);
        const addressBookId = urlParams.get('id');

        client({
        method: 'POST',
        path: '/v1/api/pwc/contact?unique=true',
        headers: {'Content-Type': 'application/json' , 'Authorization' : 'abc123'}
        }).done(response => {
                    console.log(response.entity);
        			this.setState({contactList:response.entity, contactName:'', contactPhoneNumber:'', 'afterSave' : false});
        		});
    }

    render() {

    const urlParams = new URLSearchParams(window.location.href);
    const addressBookId = urlParams.get('id');

    return (
      <div>
            <h2>Unique Contacts in all Address Books</h2>
            <ContactList contactList={this.state.contactList}/>
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
                <table>
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
export default UniqueContactsList;