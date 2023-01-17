import './checkout-quantity.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CheckoutQuantity = ({product}) => {
    const { addItemToCart, subtractItemFromCart } = useContext(CartContext)

    return (
        <div>
            <span className='symbol' onClick={() => subtractItemFromCart(product)}>&lt; </span>
            <span>{product.quantity}</span>
            <span className='symbol' onClick={() => addItemToCart(product)}> &gt;</span>
        </div>
    )
}

export default CheckoutQuantity;