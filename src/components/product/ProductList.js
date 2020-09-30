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
import './ProductList.css'

class ProductDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filteredProducts: [],
            newProductData: {
                name: '',
                price: '',
                detail: '',
                category: ''
                
            },
            searchData: {
                name: ''
            },
            editProductData: {
                id: '',
                name: '',
                price: '',
                detail: '',
                category: ''
            },
            newProductModal: false,
            editProductModal: false,
        }

        this.temp = '123'
        
    }
    componentDidMount() {
      this._refreshProducts();
    }

    toggleNewProductModal() {
        this.setState({
            newProductModal: !this.state.newProductModal
        });
    }

    /*addProduct() {
        axios.post('http://localhost:3000/product', this.state.newProductData).then(res => {
            let { products } = this.state;
            products.push(res.data);
            this.setState({ products, newProductModal: false, newProductData: {
              name: '',
              email: '',
              phone: '',
              checked: false
            } });
        });
    }*/
    toggleEditProductModal() {
        this.setState({
            editProductModal: !this.state.editProductModal
        });
    }
    editProduct(id, name, price, detail, category) {
        this.setState({
            editProductData: { id, name, price, detail,category },
            editProductModal: !this.state.editProductModal
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
                this.setState({editProductModal: false, editProductData: {id:'', name:'', price:'', detail: '', category}})
            });
    }

    deleteProduct(id) {
        axios.delete('http://localhost:3000/product/' + id).then(response => {
            this._refreshProducts();
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
       

        let result;
        if (this.state.filteredProducts.length !== 0) {
            result = this.state.filteredProducts;
        } else {
            result = this.state.products;
        }
        let products = result.map(product => {
            return (
                
                <tr key={product.id}>
                           <td><input type='checkbox' value={product.checked} /></td>
                           <td>{product.id}</td>
                           <td>{product.name}</td>
                           <td>{product.price}</td>
                           <td>{product.detail}</td>
                           <td>{product.category}</td>
                           <td>
                             <Button
                               color="warning"
                               size="sm"
                               className="mr-2 "
                               onClick={this.editProduct.bind(this, product.id, product.name, product.email, product.phone)}
                             >
                               Edit
                             </Button>{' '}
                             <Button color="danger" size="sm" onClick={() => this.deleteProduct(product.id)}>
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
                    onClick={this.toggleNewProductModal.bind(this)}
                >
                    + Add Product Details
                </Button>{' '}
                */}
                
                    <div className='row'>
                    <FormGroup>
                    <Input
                        type="search"
                        placeholder="Search product by their names..."
                        onChange={e => {
                            this.setState({
                                filteredProducts: this.state.products.filter(product => {
                                    return product.name.indexOf(e.target.value) !== -1;
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
                            this.state.products.sort((a, b) => {
                               if (a.name > b.name)   {
                                 return 1;
                               } else if (a.name < b.name) {
                                 return -1;
                               } else {
                                 return 0;
                               }
                               });
                                this.setState({
                                  filteredProducts: this.state.products
                                            });
                                        }}
                                    >
                                    Sort by Name ASC
                          </Button>{' '}
                        </div>
                        <div className='col'>
                          <Button
                                className="my-3 btn-block sortBtn"
                                color="info"
                                onClick={e => {
                                            this.state.products.sort((a, b) => {
                                                if (a.name > b.name) {
                                                    return -1;
                                                } else if (a.name < b.name) {
                                                    return 1;
                                                } else {
                                                    return 0;
                                                }
                                            });
                                            this.setState({
                                                filteredProducts: this.state.products
                                            });
                                        }}
                            >
                              Sort by Name DESC
                          </Button>{' '}
                        </div>
                        <div className='col'>
                         <Button
                                className="my-3 btn-block sortBtn"
                                color="secondary"
                                        onClick={e => {
                                            this.state.products.sort((a, b) => {
                                                if (a.category > b.category) {
                                                    return 1;
                                                } else if (a.category < b.category) {
                                                    return -1;
                                                } else {
                                                    return 0;
                                                }
                                            });
                                            this.setState({
                                                filteredProducts: this.state.products
                                            });
                                        }}
                                    >
                                        Sort by Category ASC
                         </Button>{' '}

                        </div>
                        <div className='col'>
                        <Button
                            className="my-3 btn-block sortBtn"
                            color="secondary"
                            onClick={e => {
                                this.state.products.sort((a, b) => {
                                    if (a.category > b.category) {
                                        return -1;
                                    } else if (a.category< b.category) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                    });
                                    this.setState({
                                        filteredProducts: this.state.products
                                   });
                                        }}
                                    >
                                    Sort by Category  DESC
                        </Button>{' '} 
    
                        </div>  

                        </div>
 
                    </div>
                
                             
                
                <div className='row'>
                        <p id='para'>Scroll the below table to view more data.</p>
                </div>

                <div className='row'>
                      <div className='table'> 
                            <thead>
                                <tr>
                                    <th >Select</th>
                                    <th >Product ID</th>
                                    <th >Property Name</th>
                                    <th >Price</th>
                                    <th >Details</th>
                                    <th >Category</th>
                                    <th >Action</th>
                            
                                </tr>
                            </thead >
                                <tbody>
                                    {products} 
                                </tbody>
                       </div>
                </div>
                

                {/*<Modal isOpen={this.state.newProductModal} toggle={this.toggleNewProductModal.bind(this)}>
                    <ModalHeader toggle={this.toggleNewProductModal.bind(this)}>
                        Add a new product
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.newProductData.name}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.name = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                value={this.state.newProductData.price}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.price = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="detail">Details</Label>
                            <Input
                                id="detail"
                                value={this.state.newProductData.detail}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.detail = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input
                                id="category"
                                value={this.state.newProductData.category}
                                onChange={e => {
                                    let { newProductData } = this.state;
                                    newProductData.category = e.target.value;
                                    this.setState({ newProductData });
                                }}
                            />
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addProduct.bind(this)}>
                            Add
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewProductModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>*/}
                <Modal
                    isOpen={this.state.editProductModal}
                    toggle={this.toggleEditProductModal.bind(this)}
                >
                    <ModalHeader toggle={this.toggleEditProductModal.bind(this)}>
                        Edit product detail
                    </ModalHeader>
                    <ModalBody>
                    <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                value={this.state.editProductData.name}
                                onChange={e => {
                                    let { editProductData } = this.state;
                                    editProductData.name = e.target.value;
                                    this.setState({ editProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                value={this.state.editProductData.price}
                                onChange={e => {
                                    let { editProductData } = this.state;
                                    editProductData.price = e.target.value;
                                    this.setState({ editProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="detail">Detail</Label>
                            <Input
                                id="phone"
                                value={this.state.editProductData.detail}
                                onChange={e => {
                                    let { editProductData } = this.state;
                                    editProductData.detail = e.target.value;
                                    this.setState({ editProductData });
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input
                                id="category"
                                value={this.state.editProductData.category}
                                onChange={e => {
                                    let { editProductData } = this.state;
                                    editProductData.category = e.target.value;
                                    this.setState({ editProductData });
                                }}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateProduct.bind(this)}>
                            Update 
                        </Button>{' '}
                        <Button color="secondary" onClick={this.toggleEditProductModal.bind(this)}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
              
              
            </div>
        );
    }
}

export default ProductDashboard;