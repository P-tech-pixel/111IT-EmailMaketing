import React, { Component } from 'react'
import  '../layout/Custom.css';
import axios from 'axios';
import {
    FormGroup,
    Input,
    Button
} from 'reactstrap';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            filteredCustomers: [],
            newCustomerData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                checked: false
                
            },
            searchData: {
                firstName: ''
            },
            editCustomerData: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            },
            editCustomerModal: false,
        }
    }
  
    render() {
        let result;
        if (this.state.filteredCustomers.length !== 0) {
            result = this.state.filteredCustomers;
        } else {
            result = this.state.customers;
        }
        let customers = result.map(customer => {
            return (
                
                <tr key={customer.id}>
                           <td><input type='checkbox' value={customer.checked} /></td>
                           <td>{customer.id}</td>
                           <td>{customer.firstName}</td>
                           <td>{customer.lastName}</td>
                           <td>{customer.email}</td>
                           <td>{customer.phone}</td>
                           <td>
                             <Button
                               color="warning"
                               size="sm"
                               className="mr-2 "
                               onClick={this.editCustomer.bind(this, customer.id, customer.firstName, customer.lastName, customer.email, customer.phone)}
                             >
                               Edit
                             </Button>{' '}
                             <Button color="danger" size="sm" onClick={() => this.deleteCustomer(customer.id)}>
                               Delete
                            </Button>
                           </td>
                </tr>
                
            );
        });
        return (

            <div className="container-fluid">
                
              <div className='row'>
                  <div className='col-md-8 testtbl'>
                  <table className='tbl'>
                    <thead>
                        <tr>
                            <th>Product List</th>
                            <th>Customer List</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FormGroup>
                                    <Input
                                        type="search"
                                        placeholder="Search customer by their names..."
                                       
                                    />
                                </FormGroup>
                            </td>
                            <td>
                                <FormGroup>
                                    <Input
                                        type="search"
                                        placeholder="Search product by their names..."
                                       
                                    />
                                </FormGroup>    
                            </td>
                        </tr>
                        <tr>
                            <td>Search </td>
                            <td>Search </td>
                        </tr>
                    </tbody>
                </table>
                  </div>

              </div>
    
            
                <button class="btn waves-effect waves-light " type="submit" name="action">Send Email
                    <i class="material-icons right">send</i>
                </button>               
            </div>
        

        )
    }
}
export default Dashboard;