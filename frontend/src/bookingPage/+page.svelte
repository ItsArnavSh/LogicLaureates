import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Mock function for booking API call
const bookProperty = async (bookingDetails) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: "Booking successful!" }
}

export default function Component() {
  const router = useRouter()
  const { id } = router.query

  const [property, setProperty] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [duration, setDuration] = useState('daily')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch property details
    // This is a mock implementation. Replace with actual API call.
    const fetchProperty = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProperty({
        id: id,
        name: "Sample Property",
        description: "A beautiful storage space for your needs.",
        dailyPrice: 50,
        weeklyPrice: 300,
        monthlyPrice: 1000,
        yearlyPrice: 10000,
      })
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const handleBooking = async () => {
    setLoading(true)
    try {
      const result = await bookProperty({
        propertyId: id,
        startDate,
        endDate,
        duration
      })
      if (result.success) {
        toast({
          title: "Booking Successful",
          description: "Your storage space has been booked successfully!",
        })
        router.push('/bookings')
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#00244D]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#00244D] text-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{property.name}</CardTitle>
          <CardDescription>{property.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Booking Duration</label>
              <Select onValueChange={setDuration} defaultValue={duration}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily (₹{property.dailyPrice}/day)</SelectItem>
                  <SelectItem value="weekly">Weekly (₹{property.weeklyPrice}/week)</SelectItem>
                  <SelectItem value="monthly">Monthly (₹{property.monthlyPrice}/month)</SelectItem>
                  <SelectItem value="yearly">Yearly (₹{property.yearlyPrice}/year)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="rounded-md border"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleBooking} disabled={loading} className="w-full bg-[#663300] hover:bg-[#8B4513]">
            {loading ? "Processing..." : "Book Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
