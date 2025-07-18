"use client"

import { useForm } from "react-hook-form"
import { forwardRef, useImperativeHandle } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import type { OrderAddress } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.enum(["Rivers", "Lagos"], { message: "Only Rivers and Lagos are supported" }),
  phone: z.string().min(10, "Valid phone number is required"),
})

type AddressFormData = z.infer<typeof addressSchema>

export interface AddressFormHandle {
  submit: () => void
}

interface AddressFormProps {
  type: "shipping" | "billing"
  initialData?: Partial<OrderAddress>
  onSubmit: (data: AddressFormData) => void
  onSameAsShipping?: () => void
  showSameAsShipping?: boolean
}

export const AddressForm = forwardRef<AddressFormHandle, AddressFormProps>(
  ({ type, initialData, onSubmit, onSameAsShipping, showSameAsShipping = false }, ref) => {
    const form = useForm<AddressFormData>({
      resolver: zodResolver(addressSchema),
      defaultValues: initialData || {
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: undefined,
        phone: "",
      },
    })

    useImperativeHandle(ref, () => ({
      submit: () => {
        form.handleSubmit(onSubmit)()
      },
    }))

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{type === "shipping" ? "Shipping Address" : "Billing Address"}</h3>

          {showSameAsShipping && (
            <div className="flex items-center space-x-2">
              <Checkbox id="sameAsShipping" onCheckedChange={() => onSameAsShipping?.()} />
              <Label htmlFor="sameAsShipping">Same as shipping address</Label>
            </div>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Rivers">Rivers</SelectItem>
                          <SelectItem value="Lagos">Lagos</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    )
  }
)
