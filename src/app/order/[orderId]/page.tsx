import { getOrderById } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const order = await getOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  const shippingAddress = typeof order.shipping_address === 'string' 
    ? JSON.parse(order.shipping_address) 
    : order.shipping_address;

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span className="capitalize">{order.status?.replace(/_/g, ' ')}</span></p>
            <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
          </div>

          {shippingAddress && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
              <div className="text-muted-foreground">
                <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                <p>{shippingAddress.addressLine1}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
                <p>Phone: {shippingAddress.phone}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
