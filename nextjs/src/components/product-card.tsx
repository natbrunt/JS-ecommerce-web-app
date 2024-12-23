"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from '../contexts/cart-context';


interface Product {
    id: string,
    image: string,
    description: string,
    name: string,
    price: number,
    quantity: number
  }

export function ProductCard({ product }: { product: Product }) {

    const {cartCount, setCartCount} = useCart()  

    return (
      <Card className="w-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image 
              src={`/img/${product.image}`} 
              alt={product.name}
              fill
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold mb-2">{product.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 mb-4">{product.description}</CardDescription>
          <div className="flex justify-between items-center">
            <Badge variant="secondary" className="text-lg font-semibold">
              ${Number(product.price / 100 ).toFixed(2)}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {product.quantity} serving
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button 
            className="w-full" size="lg"
            onClick={() => setCartCount(cartCount + 1)}
          >
            Buy Now
          </Button>
          
        </CardFooter>
      </Card>
    )
  }
  


