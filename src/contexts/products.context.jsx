import { createContext, useState, useEffect } from 'react';
//import { onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import PRODUCTS from '../assets/shop-data.json'

export const ProductsContext = createContext({
    products: [],
    // setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products}

    useEffect(() => {
        // const unsubscribe = onAuthStateChangedListener((user) => {
        //     if (user) {
        //         createUserDocumentFromAuth(user)
        //     } 
        //     setCurrentUser(user)
        // })
        // return unsubscribe
        setProducts(PRODUCTS)
    }, [])

    return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
        )
}