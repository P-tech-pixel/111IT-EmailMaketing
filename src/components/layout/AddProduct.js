import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Custom.css';
import axios from 'axios';
import { Container, Button, Alert } from 'reactstrap';

 class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisible: false,
            products: [],
            newProductData: {
                name: '',
                price: '',
                detail: '',
                category: ''
                
            },
            editProductData: {
                id: '',
                name: '',
                price: '',
                detail: '',
                category: ''
            }
        }

        this.temp = '123'
        
    }
    componentDidMount() {
      this._refreshProducts();
    }
    toggle(){
        this.setState={
            alertVisible: ! this.state.alertVisible
        }
    }

    addProduct() {
        axios.post('http://localhost:3000/product', this.state.newProductData).then(res => {
            let { products } = this.state;
            products.push(res.data);
            this.setState({ products, newProductModal: false, newProductData: {
              name: '',
              price: '',
              detail: '',
              category: ''
            } });
        });
    }
    editProduct(id, name, price, detail, category) {
        this.setState({
            editProductData: { id, name, price, detail, category }
        });
    }
    updateProduct() {
        let { name, price, detail, category } = this.state.editProductData;
        axios
            .put('http://localhost:3000/product/' + this.state.editProductData.id, {
                name,
                price,
                detail,
                category
            })
            .then(response => {
                this._refreshProducts();
                this.setState({ editProductData: {id:'', name:'', price:'', detail: '', category: ''}})
            });
    }
    _refreshProducts() {
         axios.get('http://localhost:3000/product').then(res => {
            this.setState({
                products: res.data
            });
        });
    }
    
    render() {
        return (
            <div className="container addproduct">
                
                    <Alert color="success" isOpen={this.state.alertVisible} toggle={this.toggle.bind(this)}>
                        Product is successfully added. 
                    </Alert>
              

                <form action='' className="white">
                    <h5 className="grey-text text-darken-3">Add Product</h5>
                    <div className="input-field">
                        <label for="Product Name">Product Name</label>
                        <input 
                                id="name"
                                value={this.state.newProductData.name}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.name = e.target.value;
                                    this.setState({ newProductData });
                                    }}
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="Product Price">Product Price</label>
                        <input 
                                id="price"
                                value={this.state.newProductData.price}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.price = e.target.value;
                                    this.setState({ newProductData });
                                }}                        
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="Product Details">Product Details</label>
                        <input 
                                id="detail"
                                value={this.state.newProductData.detail}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.detail = e.target.value;
                                    this.setState({ newProductData });
                                }}                        
                        /> 
                    </div>
                    <div className="input-field">
                        <label for="Product Category">Product Category</label>
                        <input 
                                id="category"
                                value={this.state.newProductData.category}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.category = e.target.value;
                                    this.setState({ newProductData });
                                }}                        
                        /> 
                    </div>
                    <button class="btn waves-effect waves-light"  onClick={this.addProduct.bind(this), this.toggle.bind(this)}>Submit
                        <i class="material-icons right">send</i>
                    </button>
                </form>
                <br />
                <Link className="btn-link" to="/productList">Click here to see list of all the products</Link>
                </div>

       );
    }
}
export default AddProduct


