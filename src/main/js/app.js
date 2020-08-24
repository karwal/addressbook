'use strict';

import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from "./Home";
import ViewAddressBook from "./ViewAddressBook";
import CreateAddressBook from "./CreateAddressBook";
import ViewContactList from "./ViewContactList";
import UniqueContacts from "./UniqueContacts";

const ReactDOM = require('react-dom');
const client = require('./client');


class App extends Component {
	render() {
	  return (
		  <HashRouter>
		  <div>
			<h1>Address Book Application</h1>
			<ul className="header">
			<li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/view">View</NavLink></li>
            <li><NavLink to="/unique">Unique Contatcs</NavLink></li>
            <li class="hidden"><NavLink to="/contacts">Contact List</NavLink></li>
			</ul>
			<div className="content">
			  <Route exact path="/" component={Home}/>
			  <Route path="/create" component={CreateAddressBook}/>
			  <Route path="/view" component={ViewAddressBook}/>
			  <Route path="/unique" component={UniqueContacts}/>
			  <Route path="/contacts" component={ViewContactList}/>
			</div>
		  </div>
		  </HashRouter>
	  );
	}
  }
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}
// end::employee[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
