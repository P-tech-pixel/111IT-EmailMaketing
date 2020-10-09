import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Dash from './components/dashboard/Dash';
import  CustomNavbar from './components/layout/CustomNavbar';
import AddProduct from './components/layout/AddProduct'
import AddCustomer from './components/layout/AddCustomer';
import CustomerList from './components/customer/CustomerList'
import ProductList from './components/product/ProductList'
import Login from './components/customerProfile/login'
import Logout from './components/customerProfile/logout'
import NavbaritemsSignOut from './components/layout/NavbarItemsSignOut'
import NavbaritemsSignIn from './components/layout/NavbarItemsSignIn'
import CustomNavBar from './components/layout/CustomNavbar'



class App extends Component {
  render () {
    return (
     <Router>
       <CustomNavbar />
        <Switch>
          <Route exact path='/dashboard' component={Dash} />
          <Route path='/addproduct' component={AddProduct} />
          <Route path='/addcustomer' component={AddCustomer} />
          <Route path='/customerList' component = {CustomerList} />
          <Route path='/productList' component = {ProductList} />
          <Route path='/' component = {Login} />
          <Route path='/logout' component = {Logout} />
          <Route path='/navbarItemSignOut' component = {NavbaritemsSignOut} />
          <Route path='/navbarItemSignIn' component = {NavbaritemsSignIn} />
          <Route path='/customNavBar' component = {CustomNavBar} />

        </Switch>
     </Router> 
    );
  }
}     

export default App;
