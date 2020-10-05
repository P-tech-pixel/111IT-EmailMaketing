import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {
    Button,
    FormGroup,
    Input

} from 'reactstrap';
import axios from 'axios';
import  '../layout/Custom.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideTable: false,
            searchedCustomerData: {
                firstName: '',
            },
            customers: [],
            filteredCustomers: [],
            newCustomerData: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                checked: false
                
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
              checked: false
            } });
        });
    }
    editCustomer(id, firstName, lastName, email, phone) {
        this.setState({
            editCustomerData: { id, firstName, lastName, email, phone },
            editCustomerModal: !this.state.editCustomerModal
        });
    }
    updateCustomer() {
        let { firstName, lastName, email, phone } = this.state.editCustomerData;
        axios
            .put('http://localhost:3000/customer/' + this.state.editCustomerData.id, {
                firstName,
                lastName,
                email,
                phone
            })
            .then(response => {
                this._refreshCustomers();
                this.setState({editCustomerModal: false, editCustomerData: {id:'', firstName:'', lastName: '', email:'', phone: ''}})
            });
    }

    deleteCustomer(id) {
        axios.delete('http://localhost:3000/customer/' + id).then(response => {
            this._refreshCustomers();
        });
    }
    _refreshCustomers() {
         axios.get('http://localhost:3000/customer').then(res => {
            this.setState({
                customers: res.data
            });
        });
    }
    //for table search 
    showOperation(){
        if(this.state.searchedCustomerData.firstName == this.state.newCustomerData.firstName){
            this.setState({
                 hideTable: false
              })
        }
        else{
            this.setState({
                //hideTable:!this.state.hideTable
                hideTable: true,
                //customers: []
              })
        }
        //making the value of input disappear after the search button clicked.
        this.state.searchedCustomerData.firstName= ''
        //this.state.customers = []
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
                <ul key={customer.id}>
                        <li >{customer.firstName} {customer.lastName}</li>
                        <li >{customer.phone}</li>
                        <li >{customer.email}</li>
                        <li >{customer.address}</li>
                </ul>
                
            );
        });

        // main render return ....
        return (
            <div className="container-fluid">
                
              <div className='row'>
                  <div className='col-md-8 testtbl'>
                  <table className='tbl'>
                    <thead>
                        <tr>
                            <th>Customers List</th>
                            <th>Products List</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FormGroup>
                                    <Input
                                        type="search"
                                        id='customerSearch'
                                        value={this.state.searchedCustomerData.firstName}
                                        placeholder="Search customer by their names..."

                                        onChange={e => {

                                            let { searchedCustomerData } = this.state;
                                            searchedCustomerData.firstName = e.target.value;

                                            this.setState({
                                                searchedCustomerData,
                                                filteredCustomers: this.state.customers.filter(customer => {
                                                    return customer.firstName.indexOf(e.target.value) !== -1;
                                                })
                                            });
                                        }}
                                       
                                    />
                                    <Button
                                         onClick={
                                            ()=>this.showOperation()
                                        }    
                                    >Search</Button>

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
                            {
                                //the table is hidden by default
                                this.state.hideTable?
                                <div>
                                   <td>{customers}</td>
                                </div>
                                :null
                            }
                        </tr>
                    </tbody>
                </table>
                  </div>

              </div>
      
                <button class="btn waves-effect waves-light " type="submit" name="action">Send Email
                    <i class="material-icons right">send</i>
                </button>               
            </div>
        );
    }
}
export default Dashboard;