import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import axios from 'axios';
import './CustomerList.css'

class CustomerDashboard extends Component {
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

        this.temp = '123'
        
    }
    componentDidMount() {
      this._refreshCustomers();
    }

    toggleNewCustomerModal() {
        this.setState({
            newCustomerModal: !this.state.newCustomerModal
        });
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
    toggleEditCustomerModal() {
        this.setState({
            editCustomerModal: !this.state.editCustomerModal
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

        // main render return ....
        return (
            <div className='container-fluid'>
                {/*<Button
                    className="my-3 btn-block"
                    id='addBtn'
                    color="primary"
                    onClick={this.toggleNewCustomerModal.bind(this)}
                >
                    + Add Customer Details
                </Button>{' '} */}

                
                    <div className='row'>
                    <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search customer by their names..."
                        onChange={e => {
                            this.setState({
                                filteredCustomers: this.state.customers.filter(customer => {
                                    return customer.firstName.indexOf(e.target.value) !== -1;
                                })
                            });
                        }}
                    />
                     </FormGroup>
                    </div>
                    <div className='row'>
                        <div className='container-fluid'>
                        <div className='col'>
                          <Button
                            className="my-3 btn-block sortBtn"
                            color="info"
                            onClick={e => {
                            this.state.customers.sort((a, b) => {
                               if (a.firstName > b.firstName)   {
                                 return 1;
                               } else if (a.firstName < b.firstName) {
                                 return -1;
                               } else {
                                 return 0;
                               }
                               });
                                this.setState({
                                  filteredCustomers: this.state.customers
                                            });
                                        }}
                                    >
                                    Sort by firstName ASC
                          </Button>{' '}
                        </div>
                        <div className='col'>
                          <Button
                                className="my-3 btn-block sortBtn"
                                color="info"
                                onClick={e => {
                                            this.state.customers.sort((a, b) => {
                                                if (a.firstName > b.firstName) {
                                                    return -1;
                                                } else if (a.firstName < b.firstName) {
                                                    return 1;
                                                } else {
                                                    return 0;
                                                }
                                            });
                                            this.setState({
                                                filteredCustomers: this.state.customers
                                            });
                                        }}
                            >
                              Sort by firstName DESC
                          </Button>{' '}
                        </div>
                        <div className='col'>
                         <Button
                                className="my-3 btn-block sortBtn"
                                color="secondary"
                                        onClick={e => {
                                            this.state.customers.sort((a, b) => {
                                                if (a.phone > b.phone) {
                                                    return 1;
                                                } else if (a.phone < b.phone) {
                                                    return -1;
                                                } else {
                                                    return 0;
                                                }
                                            });
                                            this.setState({
                                                filteredCustomers: this.state.customers
                                            });
                                        }}
                                    >
                                        Sort by Phone Number ASC
                         </Button>{' '}

                        </div>
                        <div className='col'>
                        <Button
                            className="my-3 btn-block sortBtn"
                            color="secondary"
                            onClick={e => {
                                this.state.customers.sort((a, b) => {
                                    if (a.phone > b.phone) {
                                        return -1;
                                    } else if (a.phone < b.phone) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                    });
                                    this.setState({
                                        filteredCustomers: this.state.customers
                                   });
                                        }}
                                    >
                                    Sort by Phone Number  DESC
                        </Button>{' '} 
    
                        </div>   
                        </div>

                    </div>
                
                             
                <div className='row'>

                    <div>
                       <p id='para'>Scroll the below table to view more data.</p>
                    </div>
                      <div className='table' > 
                            <thead>
                                <tr>
                                    <th >Select</th>
                                    <th >Customer ID</th>
                                    <th >First Name</th>
                                    <th >Last Name</th>
                                    <th >Email</th>
                                    <th >Phone Number</th>
                                    <th >Actions</th>
                            
                                </tr>
                            </thead >
                                <tbody>
                                    {customers} 
                                </tbody>
                    </div>
                </div>
                

                <Modal isOpen={this.state.newCustomerModal} toggle={this.toggleNewCustomerModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewCustomerModal.bind(this)}>
                        Add a new customer
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={this.state.newCustomerData.firstName}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.firstName = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.newCustomerData.email}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.email = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={this.state.newCustomerData.phone}
                                onChange={e => {
                                    let { newCustomerData } = this.state;
                                    newCustomerData.phone = e.target.value;
                                    this.setState({ newCustomerData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addCustomer.bind(this)}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewCustomerModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Modal
                    isOpen={this.state.editCustomerModal}
                    toggle={this.toggleEditCustomerModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditCustomerModal.bind(this)}>
                        Edit customer detail
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={this.state.editCustomerData.firstName}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.firstName = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                id="email"
                                value={this.state.editCustomerData.email}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.email = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={this.state.editCustomerData.phone}
                                onChange={e => {
                                    let { editCustomerData } = this.state;
                                    editCustomerData.phone = e.target.value;
                                    this.setState({ editCustomerData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateCustomer.bind(this)}>
                            Update 
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditCustomerModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
              
              
            </div>
        );
    }
}

export default CustomerDashboard;