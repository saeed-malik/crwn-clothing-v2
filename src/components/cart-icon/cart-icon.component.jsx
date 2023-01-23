import React from "react";
import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, itemsInCart } = useContext(CartContext)

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{itemsInCart}</ItemCount> 
        </CartIconContainer>
    )
}

export default CartIcon;
