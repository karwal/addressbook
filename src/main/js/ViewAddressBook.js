import React, { Component } from "react";

const ReactDOM = require('react-dom'); // <2>
const {parse, stringify} = require('flatted');
const client = require('./client');


class ViewAddressBook extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state= {addressBooks:[]};
      }

    componentDidMount() {
        client({
        method: 'GET',
        path: '/v1/api/pwc/addressbook',

        headers: {'Content-Type': 'application/json', 'Authorization' : 'abc123'}
        }).done(response => {
                    console.log(response);
                    console.log(response.entity);
        			this.setState({addressBooks:response.entity});
        		});
    }
    render() {
    return (
      <div>
        <h2>View Address Books List</h2>
        <AddressBookList addressBooks={this.state.addressBooks}/>
      </div>
    );
    }
}

class AddressBookList extends React.Component {
    constructor(props) {
		super(props);
	}
	render() {
        const addressBooks = this.props.addressBooks.map(addressBook =>
                    <AddressBook key={addressBook.id} id={addressBook.id} value={addressBook.name}/>
        );
        return (
            <div>
                <table class="table20">
                    <tbody>
                        <tr>
                            <th>Address Book Name</th>
                        </tr>
                        {addressBooks}
                    </tbody>
                </table>
            </div>
            )
	}
}

class AddressBook extends React.Component {
    constructor(props) {
	   super(props);
	}

	render() {
    		return (
    			<tr>
    				<td><a href={"#contacts?&id=" + this.props.id + "&addressBookName=" + this.props.value}>{this.props.value}</a></td>
    			</tr>
    		)
    	}
}
export default ViewAddressBook;