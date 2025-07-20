"use client"

import { useState } from "react"
import { PlusCircle, Edit, Trash2, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock location data
const initialLocations = [
  {
    id: "L001",
    name: "LaundryLab HQ",
    type: "headquarters",
    address: "123 Main Street, Lekki Phase 1, Lagos",
    city: "Lagos",
    state: "Lagos",
    phone: "+234 801 234 5678",
    email: "hq@laundrylab.com",
    operatingHours: "Mon-Fri: 8am-6pm, Sat: 9am-5pm, Sun: Closed",
    status: "active",
  },
  {
    id: "L002",
    name: "LaundryLab Ikeja Branch",
    type: "branch",
    address: "45 Allen Avenue, Ikeja, Lagos",
    city: "Lagos",
    state: "Lagos",
    phone: "+234 802 345 6789",
    email: "ikeja@laundrylab.com",
    operatingHours: "Mon-Sat: 8am-8pm, Sun: 10am-4pm",
    status: "active",
  },
  {
    id: "L003",
    name: "LaundryLab Abuja Branch",
    type: "branch",
    address: "78 Ademola Adetokunbo Crescent, Wuse II, Abuja",
    city: "Abuja",
    state: "FCT",
    phone: "+234 803 456 7890",
    email: "abuja@laundrylab.com",
    operatingHours: "Mon-Sat: 9am-7pm, Sun: Closed",
    status: "active",
  },
  {
    id: "L004",
    name: "LaundryLab Port Harcourt Branch",
    type: "branch",
    address: "12 Aba Road, Port Harcourt, Rivers",
    city: "Port Harcourt",
    state: "Rivers",
    phone: "+234 804 567 8901",
    email: "ph@laundrylab.com",
    operatingHours: "Mon-Sat: 8am-6pm, Sun: Closed",
    status: "active",
  },
  {
    id: "L005",
    name: "LaundryLab Ibadan Branch",
    type: "branch",
    address: "56 Mokola Hill, Ibadan, Oyo",
    city: "Ibadan",
    state: "Oyo",
    phone: "+234 805 678 9012",
    email: "ibadan@laundrylab.com",
    operatingHours: "Mon-Sat: 8am-6pm, Sun: Closed",
    status: "maintenance",
  },
  {
    id: "L006",
    name: "LaundryLab Kano Branch",
    type: "branch",
    address: "34 Ibrahim Taiwo Road, Kano",
    city: "Kano",
    state: "Kano",
    phone: "+234 806 789 0123",
    email: "kano@laundrylab.com",
    operatingHours: "Mon-Sat: 8am-6pm, Sun: Closed",
    status: "coming_soon",
  },
]

export default function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    type: "branch",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    operatingHours: "",
    status: "active",
  })

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddLocation = () => {
    const locationId = `L${String(locations.length + 1).padStart(3, "0")}`

    setLocations([
      ...locations,
      {
        ...newLocation,
        id: locationId,
      },
    ])

    setIsAddDialogOpen(false)
    setNewLocation({
      name: "",
      type: "branch",
      address: "",
      city: "",
      state: "",
      phone: "",
      email: "",
      operatingHours: "",
      status: "active",
    })
  }

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter((location) => location.id !== id))
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Locations</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
              <DialogDescription>Enter the details for the new LaundryLab location.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Location Name</Label>
                  <Input
                    id="name"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                    placeholder="e.g. LaundryLab Victoria Island"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Location Type</Label>
                  <Select
                    value={newLocation.type}
                    onValueChange={(value) => setNewLocation({ ...newLocation, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="headquarters">Headquarters</SelectItem>
                      <SelectItem value="branch">Branch</SelectItem>
                      <SelectItem value="pickup">Pickup Point</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={newLocation.address}
                  onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                  placeholder="Full street address"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newLocation.city}
                    onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                    placeholder="e.g. Lagos"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newLocation.state}
                    onChange={(e) => setNewLocation({ ...newLocation, state: e.target.value })}
                    placeholder="e.g. Lagos"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newLocation.phone}
                    onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                    placeholder="e.g. +234 801 234 5678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newLocation.email}
                    onChange={(e) => setNewLocation({ ...newLocation, email: e.target.value })}
                    placeholder="e.g. branch@laundrylab.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  value={newLocation.operatingHours}
                  onChange={(e) => setNewLocation({ ...newLocation, operatingHours: e.target.value })}
                  placeholder="e.g. Mon-Fri: 8am-6pm, Sat: 9am-5pm, Sun: Closed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newLocation.status}
                  onValueChange={(value) => setNewLocation({ ...newLocation, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    <SelectItem value="coming_soon">Coming Soon</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddLocation}>Add Location</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LaundryLab Locations</CardTitle>
          <CardDescription>Manage all LaundryLab physical locations and branches.</CardDescription>
          <div className="flex items-center mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search locations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] ml-4">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
                <SelectItem value="coming_soon">Coming Soon</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Operating Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="font-medium">{location.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">{location.type.replace("_", " ")}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{location.address}</div>
                        <div className="text-sm text-muted-foreground">
                          {location.city}, {location.state}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{location.phone}</div>
                    <div className="text-sm text-muted-foreground">{location.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{location.operatingHours}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        location.status === "active"
                          ? "bg-green-100 text-green-800"
                          : location.status === "maintenance"
                            ? "bg-amber-100 text-amber-800"
                            : location.status === "coming_soon"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                      }
                    >
                      {location.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteLocation(location.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
