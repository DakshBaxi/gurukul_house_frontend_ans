"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Home,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  Users,
  Wifi,
  Car,
  Utensils,
  BookOpen,
  Wind,
  Dumbbell,
  Shield,
  Heart,
  ArrowUpDown,
  XCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/global/footer"
import { fetchHostelsData } from "@/lib/actions/api"

export interface IHostel  {
    // Old fields
    _id: string;
    name: string;
    location: string;
    locationLink?: string;
    totalRemainingBeds?: number;
    hostelPrice?: number;
    nearby1?: string;
    nearby1distance?: string;
    nearby2?: string;
    nearby2distance?: string;
    nearby3?: string;
    nearby3distance?: string;

    // New fields
    state?: string;
    price?: number;
    minPrice?: number;
    maxPrice?: number;
    features?: string[];
    rating?: number;
    popular?: boolean;
    occupancy?: number;
    established?: number;
    capacity?: number;
    gender?: string;
    hostelType?: string;
    distance?: number;
    description?: string;
    roomTypes?: {
        type: string;
        price: string;
        icon?: string;
    }[];
    facilities?: {
        name: string;
        icon?: string;
    }[];
    gallery?: string[];
    usps?: string[];
}

const facilityIcons = {
  "AC Rooms": Wind,
  "Study Hall": BookOpen,
  "Veg Meals": Utensils,
  "Meditation Hall": Heart,
  WiFi: Wifi,
  Security: Shield,
  Library: BookOpen,
  Gym: Dumbbell,
  Cafeteria: Utensils,
  "Study Pods": BookOpen,
  "Yoga Hall": Heart,
  "Co-working": Users,
  Sports: Dumbbell,
  Parking: Car,
}

export default function HostelsPage() {
   const [hostels, setHostels] = useState<IHostel[]>([]) // State to hold all hostels data
  const [filteredHostels, setFilteredHostels] = useState<IHostel[]>([])
  const [loading, setLoading] = useState(true) // State to manage loading state
  const [filters, setFilters] = useState({
    city: "all",
    gender: "all",
    hostelType: "all",
    priceRange: [7000, 15000],
    rating: 0,
    facilities: [] as string[],
    sortBy: "popular",
  })
  const [showAdvancedFiltersDialog, setShowAdvancedFiltersDialog] = useState(false) // State for dialog visibility
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -30])
  const y2 = useTransform(scrollY, [0, 300], [0, 30])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(()=>{
    setLoading(true);
    // fetching hostels data from an API or database can be done here
    async function fetchHostels() {
      const response = await  fetchHostelsData();
      setHostels(response);
      setFilteredHostels(response);
    }
    fetchHostels();
    setLoading(false);
  },[])

  const applyFilters = () => {
    let filtered = [...hostels] // Create a copy of the hostels array

    if (filters.city !== "all") {
      filtered = filtered.filter((hostel) => hostel.location?.toLowerCase() === filters.city.toLowerCase())
    }

    if (filters.gender !== "all") {
      filtered = filtered.filter((hostel) => hostel.gender === filters.gender || hostel.gender === "Co-ed")
    }

    if (filters.hostelType !== "all") {
      filtered = filtered.filter((hostel) => hostel.hostelType === filters.hostelType)
    }

    filtered = filtered.filter(
      (hostel) => 
        (hostel.minPrice || 0) >= filters.priceRange[0] && 
        (hostel.maxPrice || 0) <= filters.priceRange[1],
    )

    if (filters.rating > 0) {
      filtered = filtered.filter((hostel) => (hostel.rating || 0) >= filters.rating)
    }

    if (filters.facilities.length > 0) {
      filtered = filtered.filter((hostel) => 
        filters.facilities.every((facility) => hostel.features?.includes(facility))
      )
    }

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.minPrice || 0) - (b.minPrice || 0))
        break
      case "price-high":
        filtered.sort((a, b) => (b.minPrice || 0) - (a.minPrice || 0))
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case "popular":
        filtered.sort((a, b) => (b.occupancy || 0) - (a.occupancy || 0))
        break
      case "newest":
        filtered.sort((a, b) => (b.established || 0) - (a.established || 0))
        break
    }

    setFilteredHostels(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters])

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFacility = (facility: string) => {
    setFilters((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }))
  }

  const clearFilters = () => {
    setFilters({
      city: "all",
      gender: "all",
      hostelType: "all",
      priceRange: [7000, 15000],
      rating: 0,
      facilities: [],
      sortBy: "popular",
    })
  }

  const allFacilities = Array.from(new Set(hostels.flatMap((h) => h.features || []))).sort()
  if (loading|| !hostels) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7f3e9]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#589a44] border-t-transparent rounded-full mb-4"
        />
        <p className="text-[#4a3728] font-medium">Loading hostel details...</p>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-[#f7f3e9] overflow-hidden">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 md:left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-[#204735]/20 rounded-full px-8 py-4 shadow-2xl"
      >
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#589a44] to-[#204735] rounded-full flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#4a3728]">Gurukul</span>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-[#4a3728] hover:text-[#589a44] transition-colors text-sm font-medium">
              Home
            </Link>
            <Link href="/hostels" className="text-[#589a44] text-sm font-medium">
              Hostels
            </Link>
            {/* <Link href="/about" className="text-[#4a3728] hover:text-[#589a44] transition-colors text-sm font-medium">
              About
            </Link> */}
          </div>
          <Link href="/">
            <Button size="sm" className="bg-[#589a44] hover:bg-[#204735] text-white rounded-full px-6">
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#589a44]/20 to-[#204735]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#81b29a]/20 to-[#4a3728]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[85vh]">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 pt-20"
            >
              <motion.div
                animate={{
                  x: mousePosition.x * 0.005,
                  y: mousePosition.y * 0.005,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <Badge className="bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 mb-6 text-sm px-4 py-2 md:mt-0 mt-4">
                  🏠 India's Premium Student Hostels
                </Badge>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-8 leading-tight">
                Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735] whitespace-nowrap">
                  Study Sanctuary
                </span>
                Awaits
              </h1>

              <p className="text-xl text-[#4a3728]/70 mb-10 leading-relaxed max-w-2xl">
                Discover premium hostels designed exclusively for ambitious students. Experience the perfect fusion of
                ancient gurukul wisdom and modern amenities.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                  onClick={() => document.getElementById("hostels-grid")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Search className="mr-2 w-5 h-5" />
                  Find Your Hostel
                </Button>
                <Dialog open={showAdvancedFiltersDialog} onOpenChange={setShowAdvancedFiltersDialog}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-[#4a3728]/20 text-[#4a3728] hover:bg-[#4a3728] hover:text-white px-8 py-6 text-lg rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                    >
                      <SlidersHorizontal className="mr-2 w-5 h-5" />
                      Advanced Filters
                      {(filters.facilities.length > 0 ||
                        filters.gender !== "all" ||
                        filters.hostelType !== "all" ||
                        filters.rating > 0) && (
                        <Badge className="ml-2 bg-[#589a44] text-white text-xs">
                          {[
                            filters.facilities.length,
                            filters.gender !== "all" ? 1 : 0,
                            filters.hostelType !== "all" ? 1 : 0,
                            filters.rating > 0 ? 1 : 0,
                          ].reduce((a, b) => a + b, 0)}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  {/* Advanced Filters Dialog Content */}
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-[#4a3728] flex items-center">
                        <SlidersHorizontal className="w-6 h-6 mr-3 text-[#589a44]" />
                        Advanced Filters
                      </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                      {/* Gender Filter */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-[#4a3728]">Gender Preference</Label>
                        <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
                          <SelectTrigger className="border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Hostels</SelectItem>
                            <SelectItem value="Boys Only">Boys Only</SelectItem>
                            <SelectItem value="Girls Only">Girls Only</SelectItem>
                            <SelectItem value="Co-ed">Co-ed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Hostel Type Filter */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-[#4a3728]">Hostel Type</Label>
                        <Select value={filters.hostelType} onValueChange={(value) => updateFilter("hostelType", value)}>
                          <SelectTrigger className="border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="Standard">Standard</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="Luxury">Luxury</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Price Range */}
                      <div className="space-y-4 md:col-span-2">
                        <Label className="text-lg font-semibold text-[#4a3728]">
                          Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹
                          {filters.priceRange[1].toLocaleString()}
                        </Label>
                        <Slider
                          value={filters.priceRange}
                          onValueChange={(value) => updateFilter("priceRange", value)}
                          max={20000}
                          min={5000}
                          step={500}
                          className="w-full"
                        />
                      </div>

                      {/* Rating Filter */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-[#4a3728]">Minimum Rating</Label>
                        <div className="flex space-x-2">
                          {[0, 4.0, 4.5, 4.7, 4.9].map((rating) => (
                            <Button
                              key={rating}
                              variant={filters.rating === rating ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateFilter("rating", rating)}
                              className={`rounded-xl ${
                                filters.rating === rating
                                  ? "bg-[#589a44] text-white"
                                  : "border-[#204735]/30 text-[#4a3728] hover:bg-[#589a44]/10"
                              }`}
                            >
                              {rating === 0 ? "Any" : `${rating}+`} ⭐
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Facilities Filter */}
                      <div className="space-y-4 md:col-span-2">
                        <Label className="text-lg font-semibold text-[#4a3728]">Required Facilities</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {allFacilities.map((facility) => {
                            const IconComponent = facilityIcons[facility as keyof typeof facilityIcons] || XCircle
                            return (
                              <div key={facility} className="flex items-center space-x-2">
                                <Checkbox
                                  id={facility}
                                  checked={filters.facilities.includes(facility)}
                                  onCheckedChange={() => toggleFacility(facility)}
                                  className="border-[#204735]/50 data-[state=checked]:bg-[#589a44] data-[state=checked]:border-[#589a44]"
                                />
                                <label
                                  htmlFor={facility}
                                  className="text-sm font-medium text-[#4a3728] cursor-pointer flex items-center"
                                >
                                  <IconComponent className="w-4 h-4 mr-1 text-[#589a44]" /> {facility}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-[#204735]/20 flex justify-between">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="border-[#204735]/30 text-[#4a3728] hover:bg-[#204735]/10 rounded-xl bg-transparent"
                      >
                        Clear All Filters
                      </Button>
                      <Button
                        onClick={() => setShowAdvancedFiltersDialog(false)}
                        className="bg-[#589a44] hover:bg-[#204735] text-white rounded-xl px-8"
                      >
                        Apply Filters
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-3 gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#204735]/20 shadow-lg"
                >
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="text-2xl font-bold text-[#589a44]">{filteredHostels?.length}</div>
                  <div className="text-xs text-[#4a3728]/60 font-medium">Available</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#204735]/20 shadow-lg"
                >
                  <div className="text-2xl mb-1">🏙️</div>
                  <div className="text-2xl font-bold text-[#589a44]">15+</div>
                  <div className="text-xs text-[#4a3728]/60 font-medium">Cities</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#204735]/20 shadow-lg"
                >
                  <div className="text-2xl mb-1">⭐</div>
                  <div className="text-2xl font-bold text-[#589a44]">4.8</div>
                  <div className="text-xs text-[#4a3728]/60 font-medium">Avg Rating</div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 relative h-[600px] hidden md:block "
            >
              <motion.div
                style={{ y: y1 }}
                className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3"
              >
                <Image
                  src="/placeholder.svg?height=400&width=320&text=Modern+Hostel"
                  alt="Modern hostel"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/30 to-transparent" />
              </motion.div>

              <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6"
              >
                <Image
                  src="/placeholder.svg?height=320&width=256&text=Study+Environment"
                  alt="Study environment"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-32 left-8 bg-white rounded-2xl p-4 shadow-2xl border border-[#204735]/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#589a44] to-[#204735] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#4a3728]">Most Popular</div>
                    <div className="text-sm text-[#4a3728]/60">Kota & Delhi</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-8 right-16 bg-gradient-to-r from-[#81b29a] to-[#4a3728] text-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <div>
                    <div className="text-sm font-semibold">Premium Facilities</div>
                    <div className="text-xs opacity-80">Starting ₹7,000</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Filter Bar (Top Bar) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative py-8 bg-white/90 backdrop-blur-xl border-y  border-[#204735]/20  top-10 md:top-20 md:sticky z-40"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4 flex-1">
              <Select value={filters.city} onValueChange={(value) => updateFilter("city", value)}>
                <SelectTrigger className="w-48 border-2 border-[#204735]/30 focus:border-[#589a44] rounded-2xl bg-white/50 backdrop-blur-sm">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  <SelectItem value="kota">Kota</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>

           

              <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                <SelectTrigger className="w-48 border-2 border-[#81b29a]/30 focus:border-[#589a44] rounded-2xl bg-white/50 backdrop-blur-sm">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4 justify-center">
              <Badge className="bg-[#589a44]/20 text-[#4a3728] px-4 py-2 text-sm font-medium">
                {filteredHostels.length} hostels found
              </Badge>
              <Dialog open={showAdvancedFiltersDialog} onOpenChange={setShowAdvancedFiltersDialog}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-[#81b29a]/30 text-[#4a3728] hover:bg-[#81b29a] hover:text-white rounded-2xl bg-transparent"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                    {(filters.facilities.length > 0 ||
                      filters.gender !== "all" ||
                      filters.hostelType !== "all" ||
                      filters.rating > 0) && (
                      <Badge className="ml-2 bg-[#589a44] text-white text-xs">
                        {[
                          filters.facilities.length,
                          filters.gender !== "all" ? 1 : 0,
                          filters.hostelType !== "all" ? 1 : 0,
                          filters.rating > 0 ? 1 : 0,
                        ].reduce((a, b) => a + b, 0)}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                {/* Advanced Filters Dialog Content (repeated for consistency) */}
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#4a3728] flex items-center">
                      <SlidersHorizontal className="w-6 h-6 mr-3 text-[#589a44]" />
                      Advanced Filters
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                    {/* Gender Filter */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-[#4a3728]">Gender Preference</Label>
                      <Select value={filters.gender} onValueChange={(value) => updateFilter("gender", value)}>
                        <SelectTrigger className="border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Hostels</SelectItem>
                          <SelectItem value="Boys Only">Boys Only</SelectItem>
                          <SelectItem value="Girls Only">Girls Only</SelectItem>
                          <SelectItem value="Co-ed">Co-ed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hostel Type Filter */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-[#4a3728]">Hostel Type</Label>
                      <Select value={filters.hostelType} onValueChange={(value) => updateFilter("hostelType", value)}>
                        <SelectTrigger className="border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-4 md:col-span-2">
                      <Label className="text-lg font-semibold text-[#4a3728]">
                        Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹
                        {filters.priceRange[1].toLocaleString()}
                      </Label>
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => updateFilter("priceRange", value)}
                        max={20000}
                        min={5000}
                        step={500}
                        className="w-full"
                      />
                    </div>

                    {/* Rating Filter */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-[#4a3728]">Minimum Rating</Label>
                      <div className="flex space-x-2">
                        {[0, 4.0, 4.5, 4.7, 4.9].map((rating) => (
                          <Button
                            key={rating}
                            variant={filters.rating === rating ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateFilter("rating", rating)}
                            className={`rounded-xl ${
                              filters.rating === rating
                                ? "bg-[#589a44] text-white"
                                : "border-[#204735]/30 text-[#4a3728] hover:bg-[#589a44]/10"
                            }`}
                          >
                            {rating === 0 ? "Any" : `${rating}+`} ⭐
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Facilities Filter */}
                    <div className="space-y-4 md:col-span-2">
                      <Label className="text-lg font-semibold text-[#4a3728]">Required Facilities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {allFacilities.map((facility) => {
                          const IconComponent = facilityIcons[facility as keyof typeof facilityIcons] || XCircle
                          return (
                            <div key={facility} className="flex items-center space-x-2">
                              <Checkbox
                                id={facility}
                                checked={filters.facilities.includes(facility)}
                                onCheckedChange={() => toggleFacility(facility)}
                                className="border-[#204735]/50 data-[state=checked]:bg-[#589a44] data-[state=checked]:border-[#589a44]"
                              />
                              <label
                                htmlFor={facility}
                                className="text-sm font-medium text-[#4a3728] cursor-pointer flex items-center"
                              >
                                <IconComponent className="w-4 h-4 mr-1 text-[#589a44]" /> {facility}
                              </label>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="pt-6 border-t border-[#204735]/20 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="border-[#204735]/30 text-[#4a3728] hover:bg-[#204735]/10 rounded-xl bg-transparent"
                    >
                      Clear All Filters
                    </Button>
                    <Button
                      onClick={() => setShowAdvancedFiltersDialog(false)}
                      className="bg-[#589a44] hover:bg-[#204735] text-white rounded-xl px-8"
                    >
                      Apply Filters
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Hostels Grid */}
      <div id="hostels-grid" className="max-w-6xl mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {filteredHostels?.length > 0 ? (
            <motion.div
              key="hostels-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredHostels?.map((hostel, index) => (
                <motion.div
                  key={hostel._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  className={`${index % 3 === 1 ? "lg:translate-y-8" : ""} ${index % 3 === 2 ? "lg:translate-y-4" : ""}`}
                >
                  <Card className="group overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white rounded-3xl h-full">
                    <div className="relative overflow-hidden">
                      <Image
                        src={hostel.gallery&&hostel.gallery[0] || "/placeholder.svg"}
                        alt={hostel.name}
                        width={400}
                        height={300}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {hostel.popular && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-[#589a44] to-[#204735] text-white shadow-lg">
                            🔥 Most Popular
                          </Badge>
                        </div>
                      )}

                      <div className="absolute top-4 right-4 space-y-2">
                        <Badge className="bg-white/90 text-[#4a3728] shadow-lg backdrop-blur-sm block">
                          ⭐ {hostel.rating}
                        </Badge>
                        <Badge className="bg-[#81b29a]/90 text-white shadow-lg backdrop-blur-sm block text-xs">
                          {hostel.occupancy}% Full
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <Badge className="bg-black/80 text-white text-xs px-3 py-1">
                          {hostel.distance}km from center
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#4a3728] group-hover:text-[#589a44] transition-colors mb-1">
                            {hostel.name}
                          </h3>
                          <div className="flex items-center text-[#4a3728]/60 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">
                              {hostel.location}, {hostel.state}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-xs text-[#4a3728]/50">
                            <span>📅 Est. {hostel.established}</span>
                            <span>👥 {hostel.capacity} beds</span>
                            <span>{hostel.gender}</span>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            hostel.hostelType === "Luxury"
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : hostel.hostelType === "Premium"
                                ? "bg-gradient-to-r from-[#589a44] to-[#204735]"
                                : "bg-[#81b29a]"
                          } text-white`}
                        >
                          {hostel.hostelType}
                        </Badge>
                      </div>

                      <div className="text-3xl font-bold text-[#589a44] mb-6">
                        {hostel.price}
                        <span className="text-sm font-normal text-[#4a3728]/60">/month</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {hostel.features&&hostel.features.slice(0, 4).map((feature) => {
                          const IconComponent = facilityIcons[feature as keyof typeof facilityIcons] || XCircle
                          return (
                            <Badge
                              key={feature}
                              variant="secondary"
                              className="text-xs bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 transition-colors flex items-center space-x-1"
                            >
                              <IconComponent className="w-3 h-3" />
                              <span>{feature}</span>
                            </Badge>
                          )
                        })}
                        {hostel.features&&hostel.features.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-[#81b29a]/20 text-[#4a3728]">
                            +{hostel.features.length - 4} more
                          </Badge>
                        )}
                      </div>



                      <div className="flex space-x-3 items-center">
                        <Link href={`/hostels/${hostel._id}`} className="flex-1">
                          <Button className="w-full bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#589a44] hover:to-[#204735] text-white transition-all duration-300 rounded-2xl font-semibold py-6 text-lg shadow-lg hover:shadow-xl">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-2 border-[#589a44]/30 text-[#589a44] hover:bg-[#589a44] hover:text-white rounded-2xl px-4 bg-transparent"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#589a44]/20 to-[#204735]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-[#589a44]" />
              </div>
              <h3 className="text-3xl font-bold text-[#4a3728] mb-4">No hostels match your criteria</h3>
              <p className="text-[#4a3728]/70 mb-8 text-lg max-w-md mx-auto">
                Try adjusting your filters or search criteria to discover more amazing hostels.
              </p>
              <Button
                onClick={clearFilters}
                className="bg-[#589a44] hover:bg-[#204735] text-white px-8 py-4 rounded-2xl text-lg"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Section */}
      <section
        className="relative py-32 bg-gradient-to-br from-[#589a44] to-[#204735] overflow-hidden"
        style={{ clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#589a44]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#204735]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 pt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Still Can't Find Your <span className="text-[#589a44]">Perfect Match?</span>
            </h2>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Our hostel experts are here to help you find the ideal accommodation that perfectly matches your needs,
              budget, and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button
                  // size="lg"
                  className="bg-[#589a44] hover:bg-[#204735]  text-white md:px-12  py-8 text-xl rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                >
                  Get Personalized  
                  <br className="md:hidden"/>
                      Recommendations 
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#4a3728] px-12 py-8 text-xl rounded-2xl bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  Schedule Campus Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
          <Footer/>
    </div>
  )
}

