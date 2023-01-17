import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const matchedItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if (matchedItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity+1} : cartItem
        )
    } 
    
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const subtractCartItem = (cartItems, productToSubtract) => {
    const matchedItem = cartItems.find((cartItem) => cartItem.id === productToSubtract.id)
    if (matchedItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== productToSubtract.id ) 
    }
    
    return cartItems.map((cartItem) => cartItem.id === productToSubtract.id ? 
        {...cartItem, quantity: cartItem.quantity-1} : cartItem)
    
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id )
} 

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    itemsInCart: 0,
    cartTotal: 0,
})

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false)
    const [ cartItems, setCartItems ] = useState([])
    const [ itemsInCart, setItemsInCart ] = useState(0)
    const [ cartTotal, setCartTotal ] = useState(0)


    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setItemsInCart(newCartCount)
    }, [cartItems])
    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const subtractItemFromCart = (productToSubtract) => {
        setCartItems(subtractCartItem(cartItems, productToSubtract))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }
    
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, subtractItemFromCart, cartItems, itemsInCart, cartTotal }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}