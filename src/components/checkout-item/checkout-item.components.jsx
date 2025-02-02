import React from "react";
import CheckoutQuantity from '../checkout-quantity/checkout-quantity.component'
import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckoutItem = ({ cartItem }) => {
    const { name, price, imageUrl, quantity } = cartItem
    const { removeItemFromCart, addItemToCart, subtractItemFromCart } = useContext(CartContext)

    const addItemHandler = () => addItemToCart(cartItem)
    const subtractItemHandler = () => subtractItemFromCart(cartItem)
    const removeItemHandler = () => removeItemFromCart(cartItem)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={subtractItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            {/* <CheckoutQuantity product={cartItem} /> */}
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={removeItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;