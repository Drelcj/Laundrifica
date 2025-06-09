"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ShippingMethod {
  id: string
  name: string
  description: string
  price: number
  estimatedDelivery: string
}

interface ShippingMethodSelectorProps {
  methods: ShippingMethod[]
  selectedMethod: string
  onSelect: (methodId: string) => void
}

export function ShippingMethodSelector({ methods, selectedMethod, onSelect }: ShippingMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedMethod} onValueChange={onSelect} className="space-y-4">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer ${
                selectedMethod === method.id ? "border-primary bg-primary/5" : ""
              }`}
              onClick={() => onSelect(method.id)}
            >
              <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
              <div className="flex-1">
                <div className="flex justify-between">
                  <Label htmlFor={method.id} className="font-medium">
                    {method.name}
                  </Label>
                  <span className="font-bold">₦{method.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">{method.description}</p>
                <p className="text-sm mt-1">Estimated delivery: {method.estimatedDelivery}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
