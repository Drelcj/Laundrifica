'use client';

import { useState, useEffect, useTransition } from 'react';
import { createOrder } from '@/lib/actions/order.actions';
import { getProducts } from '@/lib/actions/product.actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2Icon } from 'lucide-react';

// Define types locally to avoid dependency on a potentially incorrect central types file
interface Product {
  id: number;
  name: string;
  price: number;
  image_urls: string[];
}

interface CartItem extends Product {
  quantity: number;
}

export default function PlaceOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customerEmail, setCustomerEmail] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    async function loadProducts() {
      const result = await getProducts();
      if (result.status === 'success') {
        // Ensure the data conforms to the Product interface
        const typedProducts = result.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image_urls: p.image_urls || [],
        }));
        setProducts(typedProducts);
      }
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    if (!customerEmail) {
      alert('Please enter a customer email.');
      return;
    }
    if (cart.length === 0) {
      alert('Please add items to the cart.');
      return;
    }

    startTransition(async () => {
      const totalAmount = calculateTotal();
      const cartItemsForAction = cart.map(item => ({ product_id: item.id, quantity: item.quantity, price_at_purchase: item.price }));
      const result = await createOrder(customerEmail, cartItemsForAction, totalAmount);

      if (result.status === 'success') {
        alert(result.message);
        setCart([]);
        setCustomerEmail('');
      } else {
        alert(result.message);
      }
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Available Products</CardTitle>
          <CardDescription>Click a product to add it to the cart.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="cursor-pointer hover:bg-muted/50" onClick={() => addToCart(product)}>
                  <CardContent className="p-4">
                    <img
                      src={product.image_urls?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      className="mb-2 aspect-square w-full rounded-md object-cover"
                    />
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">₦{product.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Place Order</CardTitle>
          <CardDescription>Enter customer details and review the cart.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="customer-email">Customer Email</Label>
            <Input
              id="customer-email"
              type="email"
              placeholder="customer@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Cart Summary</h3>
            {cart.length === 0 ? (
              <p className="text-muted-foreground">The cart is empty.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">₦{(item.price * item.quantity).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFromCart(item.id)}>
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>

          <div className="space-y-1 text-right">
            <p className="font-bold">Total: ₦{calculateTotal().toLocaleString()}</p>
          </div>

          <Button onClick={handlePlaceOrder} disabled={isPending} className="w-full">
            {isPending ? 'Placing Order...' : 'Place Order'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
