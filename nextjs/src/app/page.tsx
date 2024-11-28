import Image from 'next/image'
import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string,
  image: string,
  description: string,
  name: string,
  price: number,
  quantity: number
}

async function getProducts(): Promise<Product[]> {
  const result = await fetch('http://localhost:4040/products/get')

  // delay response
  await new Promise((resolve) => setTimeout(resolve, 3000))

  return result.json()
}

function ProductCard({ product }: { product: Product }) {
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
        <Button className="w-full" size="lg">
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
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
  return (
    <main className="mx-auto pb-12 mt-0 max-w-6xl">
      <Suspense fallback={<ProductGrid loading />}>
        <ProductList />
      </Suspense>
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