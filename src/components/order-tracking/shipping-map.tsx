"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingInfo } from "@/src/lib/types"
import type { google } from "googlemaps"

interface ShippingMapProps {
  shippingInfo: ShippingInfo
}

export function ShippingMap({ shippingInfo }: ShippingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)

  useEffect(() => {
    // Check if the Google Maps API is loaded
    if (typeof window !== "undefined" && window.google && window.google.maps && mapRef.current) {
      const { currentLocation } = shippingInfo

      if (currentLocation) {
        const { latitude, longitude } = currentLocation
        const location = { lat: latitude, lng: longitude }

        // Initialize the map if it doesn't exist
        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: 12,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          })
        } else {
          // Update the map center if it already exists
          mapInstanceRef.current.setCenter(location)
        }

        // Add or update the marker
        if (!markerRef.current) {
          markerRef.current = new window.google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: "Package Location",
            animation: window.google.maps.Animation.DROP,
          })
        } else {
          markerRef.current.setPosition(location)
        }
      }
    } else {
      // Load Google Maps API if not already loaded
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
  }, [shippingInfo])

  if (!shippingInfo.currentLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipment Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-muted rounded-md">
            <p className="text-muted-foreground">Location tracking not available yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-64 rounded-md overflow-hidden" ref={mapRef}>
            {/* Map will be rendered here */}
            <div className="h-full w-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Current Location:</span>
              <span className="text-sm">
                {shippingInfo.currentLocation.city}, {shippingInfo.currentLocation.state}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Carrier:</span>
              <span className="text-sm">{shippingInfo.carrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Tracking Number:</span>
              <span className="text-sm">{shippingInfo.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Estimated Delivery:</span>
              <span className="text-sm">{formatDate(shippingInfo.estimatedDelivery)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return "Not available"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
