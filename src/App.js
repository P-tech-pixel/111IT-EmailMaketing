import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Dash from './components/dashboard/Dash';
import  CustomNavbar from './components/layout/CustomNavbar';
import AddProduct from './components/layout/AddProduct'
import AddCustomer from './components/layout/AddCustomer';
import CustomerList from './components/customer/CustomerList'
import ProductList from './components/product/ProductList'



class App extends Component {
  render () {
    return (
     <Router>
       <CustomNavbar />
        <Switch>
          <Route exact path='/' component={Dash} />
          {/*<Route exact path='/' component={Dash} />*/}
          <Route path='/addproduct' component={AddProduct} />
          <Route path='/addcustomer' component={AddCustomer} />
          <Route path='/customerList' component = {CustomerList} />
          <Route path='/productList' component = {ProductList} />

        </Switch>
     </Router> 
    );
  }
}     

export default App;
