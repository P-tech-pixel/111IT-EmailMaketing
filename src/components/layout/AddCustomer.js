import React, { Component } from 'react'
import './Custom.css';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {Button, Modal} from 'reactstrap';

 class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            customers: [],
            newCustomerData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
                
            },
            editCustomerData: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
            }
        }

        this.temp = '123'
        
    }
    
    componentDidMount() {
      this._refreshCustomers();
    }

    addCustomer() {
        axios.post('http://localhost:3000/customer', this.state.newCustomerData).then(res => {
            let { customers } = this.state;
            customers.push(res.data);
            this.setState({ customers, newCustomerData: {
              firstName: '',
              lastName: '',
              email: '',
              phone: '',
              address: ''
            } });
        });
    }
    editCustomer(id, firstName, lastName, email, phone, address) {
        this.setState({
            editCustomerData: { id, firstName, lastName, email, phone, address }
        });
    }
    updateCustomer() {
        let { firstName, lastName, email, phone, address} = this.state.editCustomerData;
        axios
            .put('http://localhost:3000/customer/' + this.state.editCustomerData.id, {
                firstName,
                lastName,
                email,
                phone,
                address: ''
            })
            .then(response => {
                this._refreshCustomers();
                this.setState({ editCustomerData: {id:'', firstName:'', lastName:'', email: '', phone: '', address: ''}})
            });
    }
    _refreshCustomers() {
         axios.get('http://localhost:3000/customer').then(res => {
            this.setState({
                customers: res.data
            });
        });
    }
 
    
    
    render() {
        return (
            <div className="container addCustomer">
                                
                <form action='' className="white">
                    <h5 className="grey-text text-darken-3">Add customer</h5>
                    <div className="input-field">
                        <label for="First Name">First Name</label>
                        <input 
                                id="firstName"
                                value={this.state.newCustomerData.firstName}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.firstName = e.target.value;
                                    this.setState({ newCustomerData });
                                    }}
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="lastName">Last Name</label>
                        <input 
                                id="lastName"
                                value={this.state.newCustomerData.lastName}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.lastName = e.target.value;
                                    this.setState({ newCustomerData });
                                }}                        
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="customer Details">customer Details</label>
                        <input 
                                id="email"
                                value={this.state.newCustomerData.email}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.email = e.target.value;
                                    this.setState({ newCustomerData });
                                }}                        
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="Customer phone">Customer phone</label>
                        <input 
                                id="phone"
                                value={this.state.newCustomerData.phone}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.phone = e.target.value;
                                    this.setState({ newCustomerData });
                                }}                        
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="Address">Address</label>
                        <input 
                                id="address"
                                value={this.state.newCustomerData.address}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.address = e.target.value;
                                    this.setState({ newCustomerData });
                                    }}
                        /> 
                    </div>
                    <button class="btn waves-effect waves-light"  onClick={this.addCustomer.bind(this)}>Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>
                <br />
                <Link className="btn-link" to="/customerList">Click here to see list of all the customers</Link>
            </div>

       );
    }
}
export default AddCustomer

