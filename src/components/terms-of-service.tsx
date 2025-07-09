import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function TermsOfService() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Service Terms & Conditions</CardTitle>
          <CardDescription>
            Please read these terms carefully before using our laundry and dry cleaning services.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Welcome to Laundrilab. By using our services, you agree to comply with and be bound by the following terms
            and conditions. These terms may be updated from time to time, and it is your responsibility to review them
            periodically.
          </p>

          <Tabs defaultValue="missing-items" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="missing-items">Missing Items Protocol</TabsTrigger>
              <TabsTrigger value="damaged-items">Damaged Items Protocol</TabsTrigger>
            </TabsList>
            <TabsContent value="missing-items" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Missing Items Protocol</h3>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  In the event of missing items, please follow this protocol to ensure prompt resolution.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Prompt Notification</h4>
                    <p>
                      You must notify us within 6 hours of discovering any missing items. This allows us to begin our
                      search process immediately while details are fresh.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Thorough Search Period</h4>
                    <p>
                      We conduct a comprehensive search for your missing item(s) over a period of 5 working days. During
                      this time, we'll check all facilities, delivery vehicles, and processing areas.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Early Resolution Compensation</h4>
                    <p>
                      If we locate your item(s) during the search period, we'll provide compensation in the form of a
                      service discount on your next order. The discount amount will depend on how long it took to find
                      your item(s).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Item Evaluation</h4>
                    <p>
                      If your item(s) remain missing after the 5-day search period, we'll invite you on the 6th working
                      day to evaluate the cost of the missing item(s). You may be asked to provide proof of purchase or
                      other documentation to support your valuation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      5
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Refund Process</h4>
                    <p>
                      Upon conclusion of the item evaluation, we'll initiate a refund consisting of 50% cash and 50%
                      discount voucher for future services. The refund process typically takes between 7 to 14 working
                      days to complete, depending on your payment method and banking institution.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="damaged-items" className="space-y-4 pt-4">
              <h3 className="text-xl font-semibold">Damaged Items Protocol</h3>

              <Alert>
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Important Notice</AlertTitle>
                <AlertDescription>
                  In the event of damaged items, please follow this protocol to ensure prompt resolution.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Notification Process</h4>
                    <p>
                      You must report any damage to your items within 24 hours of receiving your order. Please provide
                      clear photographs of the damage and a description of the item's condition before it was processed.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Evaluation Procedure</h4>
                    <p>
                      Our quality control team will assess the reported damage within 3 working days. This may require
                      you to bring or send the damaged item back to us for inspection. We'll determine if the damage
                      occurred during our care and the extent of the damage.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Compensation Structure</h4>
                    <p>
                      If we determine that the damage occurred while the item was in our care, we offer the following
                      compensation options:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Repair of the item at our expense (when possible)</li>
                      <li>Replacement with an identical or similar item</li>
                      <li>
                        Monetary compensation based on the current market value of the item, accounting for age and
                        condition
                      </li>
                      <li>Service credit worth 150% of the item's assessed value</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border rounded-lg bg-muted/30">
                  <div className="md:col-span-1 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h4 className="font-medium">Timeline for Resolution</h4>
                    <p>
                      We strive to resolve all damage claims within 14 working days from the initial report. This
                      includes the evaluation period and implementation of the agreed-upon compensation. For complex
                      cases, this timeline may be extended, but we'll keep you informed throughout the process.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>General Terms & Conditions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Service Availability</h4>
                    <p>
                      Laundrilab services are available within designated service areas in Nigeria. Service availability
                      may vary by location and is subject to change without notice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Pricing and Payment</h4>
                    <p>
                      All prices are in Nigerian Naira (₦) and are subject to change. Payment is required at the time of
                      service or according to your membership plan terms.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Service Turnaround Time</h4>
                    <p>
                      Standard turnaround time is 48-72 hours, depending on service type and volume. Premium members
                      enjoy expedited processing as specified in their membership terms.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Cancellation Policy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Order Cancellation</h4>
                    <p>
                      Orders can be cancelled free of charge up to 2 hours before the scheduled pickup time.
                      Cancellations made less than 2 hours before pickup may incur a cancellation fee of ₦1,000.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Membership Cancellation</h4>
                    <p>
                      Monthly memberships can be cancelled at any time, effective at the end of the current billing
                      period. Annual memberships are non-refundable but will remain active until the end of the paid
                      term.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Privacy and Data Protection</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Data Collection and Usage</h4>
                    <p>
                      We collect and process personal data in accordance with our Privacy Policy and applicable Nigerian
                      data protection laws. Your data is used solely for providing and improving our services.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Security Measures</h4>
                    <p>
                      We implement appropriate technical and organizational measures to protect your personal data
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
