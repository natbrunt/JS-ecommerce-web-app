"use client"
import { useState } from 'react'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductCard } from '@/components/product-card'
import { CartProvider } from '../contexts/cart-context';
import { useCart } from '../contexts/cart-context'



interface Product {
  id: string,
  image: string,
  description: string,
  name: string,
  price: number,
  quantity: number
}


async function getProducts(): Promise<Product[]> {
  //json-server --watch ./_data/db.json --port 4000
  const result = await fetch('http://localhost:4000/products')

  //mongoosey
  //const result = await fetch('http://localhost:4040/products/get')

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return result.json()
}

function ProductCardSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full" />
      </CardHeader>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-2/3 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default function Home() {
  const {cartCount} = useCart();

  return (
    <main className="mx-auto pb-12 mt-0 max-w-6xl">
      <CartProvider>
        <Suspense fallback={<ProductGrid loading />}>
          <ProductList />
        </Suspense>
      </CartProvider>
    </main>
  )
}

async function ProductList() {
  const products = await getProducts()
  return <ProductGrid products={products} />
}

function ProductGrid({ products, loading }: { products?: Product[], loading?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {loading
        ? Array(6).fill(0).map((_, index) => <ProductCardSkeleton key={index} />)
        : products?.map((product) => <ProductCard key={product.id} product={product} />)
      }
    </div>
  )
}