import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout : false,
        };
    }
    // handleInput=(e)=>{
    //     this.setState({[e.target.name]: e.target.value})
    // }
    handleInput=(e)=>{
        this.setState((prevState) => ({...prevState,[e.target.name]: e.target.value}))
        };
    createOrder =(e)=>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    }
  render() {
      const {cartItems} = this.props;
    return (
      <div>
        {cartItems.length === 0? <div className="cart cart-header">Cart is empty</div> 
        :
        <div className="cart cart-header">You have {cartItems.length} in the cart {" "}</div> }
      
      
      <div className="">
      <div className="cart">
          <ul className="cart-items">
              {cartItems.map(item=>(
                  <li key={item._id}>
                      <div className="">
                          <img src={item.image} alt={item.title} />
                      </div>

                      <div className="">
                          <div className="">{item.title}</div>

                          <div className="right">
                          {formatCurrency(item.price)} x {item.count} {" "}
                          <button className='button' onClick={()=>this.props.removeFromCart(item)}>
                              Remove
                          </button>
                          </div>

                      </div>
                  </li>
              ))}
          </ul>
      </div>

      {cartItems.length !== 0 && (
      <>
        <div className="cart">
          <div className="total">
              <div className="">
                  Total:{" "}
                  {formatCurrency(
                      cartItems.reduce((a, c)=> a + c.price * c.count, 0)
                  )}
              </div>
              <button onClick={()=>{this.setState(prevState =>({...prevState, showCheckout: true}))}} className='button primary'>Proceed</button>
          </div>
        </div> 
        { this.state.showCheckout && (
            <div className="cart">
                <form action="" onSubmit={this.createOrder}>
                    <ul className='form-container'>
                        <li>
                            <label htmlFor="">Email</label>
                            <input name="email" type="email" required onChange={this.handleInput}/>
                        </li>
                        <li>
                            <label htmlFor="">Name</label>
                            <input name="name" type="text" required onChange={this.handleInput}/>
                        </li>
                        <li>
                            <label htmlFor="">Adress</label>
                            <input name="address" type="text" required onChange={this.handleInput}/>
                        </li>
                        <li>
                            <button className='button primary' type='submit'>Checkout</button>
                        </li>
                    </ul>
                </form>
            </div>
        )}

      </>
      )}


      </div>

      </div>
    )
  }
}
