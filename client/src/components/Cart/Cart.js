import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItemsToCart, removeItemsToCart } from '../../actions/cartAction'
import './cart.css'
import Metadata from '../layout/Metadata'

const Cart = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart)
  

  const increaseQuantity = (id, quantity, stock) => {

    const newqty = quantity + 1;

    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newqty))
  }




  const decreaseQuantity = (id, quantity) => {

    const newqty = quantity - 1;

    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newqty))
  }


  const deleteCartItems = (id) => {
    dispatch(removeItemsToCart(id))
  }

  const checkoutHandler = () => {
    navigate("/shipping")
  }



  return (


    <>
<Metadata title="Cart"/>

      {
        cartItems && cartItems.length === 0 ? <div class="site">
          <div class="sketch">
            <div class="bee-sketch red"></div>
            <div class="bee-sketch blue"></div>
          </div>

          <h1>
            <small> Not Items Found</small></h1>
        </div> : <div className="cart_section">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="cart_container">
                  <div className="cart_title">Add To Cart</div>
                  <div className="cart_items">
                    <ul className="cart_list">

                      {
                        cartItems && cartItems.map((item) => (
                          <li className="cart_item clearfix">
                            <div className="cart_item_image"><img src={item.image} alt="" /></div>
                            <div className="cart_item_info d-flex flex-md-row align-items-center flex-column justify-content-between">
                              <div className="cart_item_name cart_info_col">
                                <div className="cart_item_title">Name</div>
                                <div className="cart_item_text">{item.name}</div>
                              </div>
                               <div className="cart_item_color cart_info_col">
                              <div class="input-group">
                                <span class="input-group-btn">
                                  <button type="button" onClick={() => decreaseQuantity(item.product, item.quantity)} class="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                                    <span class="fa fa-minus"></span>
                                  </button>
                                </span>
                                <input type="text" class="form-control input-number" value={item.quantity} readonly />
                                <span class="input-group-btn">
                                  <button type="button" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} class="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                                    <span class="fa fa-plus"></span>
                                  </button>
                                </span>
                              </div>
                              </div>


                              {/* <div className="cart_item_quantity cart_info_col">
                                    <div className="cart_item_title">Quantity</div>
                                    <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                                    <input className="cart_item_text" type="number" value={item.quantity} readonly  />
                                    <button onClick = {()=>decreaseQuantity(item.product,item.quantity)}>-</button>
                                </div> */}
                              <div className="cart_item_price cart_info_col">
                                <div className="cart_item_title">Price</div>
                                <div className="cart_item_text">₹{item.price.toFixed(1)}</div>
                              </div>
                             
                              <div className="cart_item_total cart_info_col">
                                <div className="cart_item_title">Total</div>
                                <div className="cart_item_text">₹{(item.price * item.quantity).toFixed(1)}</div>
                              </div>
                              <div className="cart_item_total cart_info_col">
                                <div className="cart_item_title"></div>
                                <div className="cart_item_text" onClick={() => deleteCartItems(item.product)}><i className="fa fa-trash"></i></div>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="order_total">
                    <div className="order_total_content text-end">
                      <div className="order_total_title">Order Total:</div>
                      <div className="order_total_amount">₹{cartItems.map(
                        (item) => (item.quantity * item.price).toFixed(1)
                      )}</div>
                    </div>
                  </div>
                  <div className="cart_buttons">
                    <Link to="/products"> <button type="button" className="button cart_button_clear" >Continue Shopping</button> </Link>
                    <button type="button" className="button cart_button_checkout" onClick={checkoutHandler}>Check Out </button> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }


    </>
  )
}

export default Cart