import React, { createContext, useState, useContext } from 'react';

interface CartContextType {
    cartCount: number;
    setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: {children: React.ReactNode}) {
    const [cartCount, setCartCount] = useState(0);
    return (
        <CartContext.Provider value={{ cartCount, setCartCount}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined){
        throw new Error('useCount must be used within a CardProvider')
    }
    return context;
}

