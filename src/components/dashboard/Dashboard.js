import React, { Component } from 'react'
import ProductList from '../product/ProductList';
import CustomerList from '../customer/CustomerList';
// import  '../layout/Custom.css';
import {
    FormGroup,
    Input
} from 'reactstrap';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCustomers: []
        
       }
    }
  
    render() {
        return (
            <div className='container-fluid'>
                
                <div className='row'>
                    <div className='col'>
                          <FormGroup>
                            <Input
                                type="search"
                                placeholder="Search customer by their names..."
                        
                            />
                          </FormGroup>

                    </div>
                    <div className='col'>

                          <FormGroup>
                            <Input
                                type="search"
                                placeholder="Search customer by their names..."
                        
                            />
                          </FormGroup>

                    </div>

                </div>
               
            </div>
        )
    }
}
export default Dashboard;