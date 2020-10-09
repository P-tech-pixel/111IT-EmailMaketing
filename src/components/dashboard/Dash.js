
import React, {Component} from 'react'
import axios from 'axios';


class Dash extends Component{
    constructor(props){
        super(props)
        this.state ={
            customers: [],
            inputValue: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/customer')
        .then(res => {
           console.log(res)
           this.setState({
               customers: res.data
           });
       });
   }
   updateInputValue(e){
       this.setState({
           inputValue: e.target.value
       })
   }
   render(){
        const list = this.state.customers
        .filter(customer => customer.firstName === this.state.inputValue)
        .map(filteredCustomer => (
            <ul key={filteredCustomer.id}>
                <li >{filteredCustomer.firstName} {filteredCustomer.lastName}, {filteredCustomer.phone}, {filteredCustomer.email}, {filteredCustomer.address} </li>
            </ul>
            ))

       return(
           <div>
               <div className='container-fluid'>
                   <div className='row'>
                       <table >
                           <thead>
                              <tr>
                               <th>Search Customers </th>
                               <th>Selected Customers </th> 
                               </tr>
                           </thead>
                           <tbody>
                               <tr>
                                   <td>
                                        <input  
                                            placeholder='Search by customer first name'   
                                            value = {this.state.inputValue}
                                            onChange = { e => this.updateInputValue(e)
                                            }                          
                                        />
                                        {list}
                                   </td>
                                   <td>
                                       Selected Customers: 
                                   </td>
                               </tr>
                           </tbody>
                       </table>  
                   </div>   
               </div>
           </div>)}

}
export default Dash