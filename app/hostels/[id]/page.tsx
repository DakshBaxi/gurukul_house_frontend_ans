"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  BookOpen,
  Wind,
  Dumbbell,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Home,
  Sparkles,
  Users,
  Clock,
  User,
  GraduationCap,
  Calendar,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Footer from "@/components/global/footer"

// Mock data - in real app this would come from API/database
const hostelData = {
  "gurukul-heights": {
    name: "Gurukul Heights",
    location: "Kota, Rajasthan",
    rent: "₹10,000",
    rating: 4.8,
    reviews: 156,
    coverImage: "/images/room.jpg",
    description:
      "Gurukul Heights stands as a beacon of academic excellence in the heart of Kota. Inspired by ancient gurukul traditions yet equipped with modern amenities, we create an environment where discipline meets dreams. Our students don't just prepare for exams; they prepare for life.",
    roomTypes: [
      { type: "Single AC", price: "₹12,000", icon: "🏠" },
      { type: "Double AC", price: "₹10,000", icon: "👥" },
      { type: "Triple Sharing", price: "₹8,000", icon: "🏘️" },
    ],
    facilities: [
      { name: "High-Speed WiFi", icon: Wifi },
      { name: "AC Rooms", icon: Wind },
      { name: "Study Hall", icon: BookOpen },
      { name: "Veg Meals", icon: Utensils },
      { name: "Meditation Hall", icon: Heart },
      { name: "Security", icon: Shield },
      { name: "Parking", icon: Car },
      { name: "Gym", icon: Dumbbell },
    ],
    gallery: [
      "/images/room.jpg",
      "/images/room.jpg",
      "/images/room.jpg",
      "/images/room.jpg",
      "/images/room.jpg",
      "/images/room.jpg",
    ],
    usps: [
      "Silent Hours (10 PM - 6 AM) for focused study",
      "Peer Mentor System with senior students",
      "Daily meditation and yoga sessions",
      "Group Study Pods for collaborative learning",
      "24/7 Security with CCTV monitoring",
      "Nutritious vegetarian meals",
    ],
    courseTypes: ["JEE", "NEET"],
  },
}

export default function HostelDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isApplyFormOpen, setIsApplyFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const hostel = hostelData[params.id as keyof typeof hostelData] || hostelData["gurukul-heights"]
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 30])
   const { toast } = useToast()
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.gallery.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hostel.gallery.length) % hostel.gallery.length)
  }

    const handleApplySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsApplyFormOpen(false)
    toast({
      title: "Application Submitted!",
      description: `Your application for ${hostel.name} has been received. We'll contact you soon.`,
      duration: 5000,
    })
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
            <Link href="/hostels" className="text-[#4a3728] hover:text-[#589a44] transition-colors text-sm font-medium">
              Hostels
            </Link>
            <Link href="/about" className="text-[#4a3728] hover:text-[#589a44] transition-colors text-sm font-medium">
              About
            </Link>
          </div>
          <Link href="/hostels">
            <Button size="sm" className="bg-[#589a44] hover:bg-[#204735] text-white rounded-full px-6">
              Back to Hostels
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] md:h-[80vh] overflow-hidden  "
      >
        <div className="absolute inset-0">
          <Image src={hostel.coverImage || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/70 via-transparent to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="absolute top-20 right-20 w-32 h-32 bg-[#589a44]/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: mousePosition.x * -0.01,
              y: mousePosition.y * -0.01,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="absolute bottom-20 left-20 w-48 h-48 bg-[#81b29a]/20 rounded-full blur-3xl"
          />
        </div>

        {/* Hostel Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 pl-8 pt-16 md:p-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4 px-4 py-2">Premium Student Hostel</Badge>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">{hostel.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="flex items-center text-white/90">
                  <MapPin className="w-6 h-6 mr-3" />
                  <span className="text-xl font-medium">{hostel.location}</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Star className="w-6 h-6 mr-2 fill-[#589a44] text-[#589a44]" />
                  <span className="text-xl font-semibold">{hostel.rating}</span>
                  <span className="text-lg ml-2">({hostel.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-white/90">
                  <Users className="w-6 h-6 mr-2" />
                  <span className="text-lg">Premium Community</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-32 right-8 space-y-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-[#4a3728] rounded-2xl px-6 py-3">
              <Sparkles className="w-5 h-5 mr-2" />
              Premium
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Essential Info - Enhanced */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-2xl rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-[#4a3728]">Essential Information</h2>
                    <Badge className="bg-gradient-to-r from-[#589a44] to-[#204735] text-white px-4 py-2">
                      Most Popular
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 bg-gradient-to-br from-[#589a44]/10 to-[#204735]/10 rounded-2xl border-2 border-[#589a44]/20 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#589a44]/10 rounded-full -mr-8 -mt-8" />
                      <div className="text-4xl font-bold text-[#589a44] mb-2">{hostel.rent}</div>
                      <div className="text-sm text-[#4a3728]/60 font-medium">Starting from/month</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 bg-gradient-to-br from-[#81b29a]/10 to-[#4a3728]/10 rounded-2xl border-2 border-[#81b29a]/20 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#81b29a]/10 rounded-full -mr-8 -mt-8" />
                      <div className="text-4xl font-bold text-[#4a3728] mb-2">{hostel.rating}</div>
                      <div className="text-sm text-[#4a3728]/60 font-medium">Rating</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="text-center p-6 bg-gradient-to-br from-[#204735]/10 to-[#589a44]/10 rounded-2xl border-2 border-[#204735]/20 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#204735]/10 rounded-full -mr-8 -mt-8" />
                      <div className="text-4xl font-bold text-[#4a3728] mb-2">{hostel.reviews}</div>
                      <div className="text-sm text-[#4a3728]/60 font-medium">Reviews</div>
                    </motion.div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-[#4a3728] flex items-center">
                      <Home className="w-6 h-6 mr-3 text-[#589a44]" />
                      Room Types
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {hostel.roomTypes.map((room, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -8, scale: 1.02 }}
                          className="border-2 border-[#204735]/20 rounded-2xl p-6 hover:border-[#589a44] transition-all duration-300 bg-gradient-to-br from-white to-[#f7f3e9] shadow-lg hover:shadow-xl"
                        >
                          <div className="text-4xl mb-4">{room.icon}</div>
                          <div className="font-semibold text-[#4a3728] mb-2 text-lg">{room.type}</div>
                          <div className="text-[#589a44] font-bold text-xl">{room.price}/month</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Facilities - Enhanced */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="border-0 shadow-2xl rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-[#4a3728] flex items-center">
                    <Sparkles className="w-8 h-8 mr-3 text-[#589a44]" />
                    Premium Facilities & Amenities
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {hostel.facilities.map((facility, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -3 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center p-4 bg-gradient-to-br from-[#f7f3e9] to-[#81b29a]/10 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-[#81b29a]/20 hover:border-[#589a44]/50"
                      >
                        <facility.icon className="w-6 h-6 mr-3 text-[#589a44]" />
                        <span className="text-sm font-medium text-[#4a3728]">{facility.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* About Section - Enhanced */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="border-0 shadow-2xl rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-[#4a3728]">About {hostel.name}</h2>
                  <p className="text-[#4a3728]/80 leading-relaxed mb-6 text-lg">{hostel.description}</p>
                  <div className="bg-gradient-to-r from-[#589a44]/10 to-[#204735]/10 p-6 rounded-2xl border-l-4 border-[#589a44] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#589a44]/10 rounded-full -mr-10 -mt-10" />
                    <p className="font-semibold text-[#4a3728] text-lg italic relative z-10">
                      "Inspired by ancient values, designed for modern success"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Gallery - Enhanced */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="border-0 shadow-2xl rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-[#4a3728]">Gallery</h2>
                  <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden mb-6 shadow-2xl relative">
                      <Image
                        src={hostel.gallery[currentImageIndex] || "/placeholder.svg"}
                        alt={`Gallery image ${currentImageIndex + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevImage}
                        className="rounded-full bg-white/80 backdrop-blur-sm border-[#204735]/30 hover:bg-[#589a44] hover:text-white hover:border-[#589a44] transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <Badge className="bg-[#4a3728]/10 text-[#4a3728] px-4 py-2">
                        {currentImageIndex + 1} / {hostel.gallery.length}
                      </Badge>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextImage}
                        className="rounded-full bg-white/80 backdrop-blur-sm border-[#204735]/30 hover:bg-[#589a44] hover:text-white hover:border-[#589a44] transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-6 gap-3">
                      {hostel.gallery.map((image, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`aspect-square rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                            index === currentImageIndex
                              ? "border-[#589a44] shadow-lg scale-105"
                              : "border-transparent hover:border-[#204735]/50"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Choose This Hostel - Enhanced */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="border-0 shadow-2xl rounded-3xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-8 text-[#4a3728]">Why Choose {hostel.name}?</h2>
                  <div className="space-y-6">
                    {hostel.usps.map((usp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-start group p-4 rounded-2xl hover:bg-[#f7f3e9] transition-all duration-300"
                      >
                        <div className="w-4 h-4 bg-gradient-to-r from-[#589a44] to-[#204735] rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        <p className="text-[#4a3728]/80 leading-relaxed text-lg group-hover:text-[#4a3728] transition-colors duration-300">
                          {usp}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Enhanced with Light Colors */}
          <div className="space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-6"
            >
              <Card className="border-0 shadow-2xl rounded-3xl bg-gradient-to-br from-white via-[#f7f3e9] to-white overflow-hidden ">
                <CardContent className="p-8">
                  {/* Floating Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#589a44]/10 to-[#204735]/10 rounded-full -mr-12 -mt-12" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-[#81b29a]/10 to-[#4a3728]/10 rounded-full -ml-8 -mb-8" />

                  <div className="text-center mb-8 relative z-10">
                    <Badge className="bg-[#589a44]/20 text-[#4a3728] mb-4 px-4 py-2">Premium Pricing</Badge>
                    <div className="text-5xl font-bold mb-2 text-[#4a3728]">{hostel.rent}</div>
                    <div className="text-sm text-[#4a3728]/60 font-medium">per month</div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center p-4 bg-white/50 rounded-2xl border border-[#204735]/20">
                      <span className="text-[#4a3728] font-medium flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#589a44]" />
                        Course Types:
                      </span>
                      <div className="flex gap-2">
                        {hostel.courseTypes.map((course) => (
                          <Badge key={course} className="bg-[#589a44] text-white hover:bg-[#204735] transition-colors">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

       

                  <Dialog open={isApplyFormOpen} onOpenChange={setIsApplyFormOpen}>
  <DialogTrigger asChild>
    <Button className="w-full bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white font-bold text-lg py-6 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Apply for Stay
    </Button>
  </DialogTrigger>

  <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-8 md:p-4  sm:p-6 bg-white rounded-lg shadow-xl">
    <DialogHeader>
      <DialogTitle className="text-2xl font-bold text-[#4a3728]">
        Apply for Stay at {hostel.name}
      </DialogTitle>
      <DialogDescription className="text-[#4a3728]/70">
        Fill out the form below to apply for a stay at {hostel.name}.
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleApplySubmit} className="grid gap-6 py-4">
      {/* Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#4a3728] flex items-center">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </Label>
          <Input id="name" placeholder="John Doe" required className="min-h-[44px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#4a3728] flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </Label>
          <Input id="email" type="email" placeholder="john@example.com" required className="min-h-[44px]" />
        </div>
      </div>

      {/* Phone & Course */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-[#4a3728] flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </Label>
          <Input id="phone" type="tel" placeholder="+91 98765 43210" required className="min-h-[44px]" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="course" className="text-[#4a3728] flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            Course Interested In
          </Label>
          <Select name="course" required>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JEE">JEE</SelectItem>
              <SelectItem value="NEET">NEET</SelectItem>
              <SelectItem value="CA">CA</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <Label htmlFor="duration" className="text-[#4a3728] flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Desired Stay Duration
        </Label>
        <Select name="duration" required>
          <SelectTrigger className="min-h-[44px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6-months">6 Months</SelectItem>
            <SelectItem value="1-year">1 Year</SelectItem>
            <SelectItem value="2-years">2 Years</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-[#4a3728] flex items-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Additional Message (Optional)
        </Label>
        <Textarea
          id="message"
          placeholder="Any specific requirements or questions?"
          className="min-h-[100px]"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white font-bold text-lg py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  </DialogContent>
</Dialog>


                  <div className="text-center text-sm text-[#4a3728]/70 mb-6 space-y-2 p-4 bg-[#81b29a]/10 rounded-2xl border border-[#81b29a]/20">
                    <p className="font-medium flex items-center justify-center">
                      <Sparkles className="w-4 h-4 mr-2 text-[#589a44]" />
                      Limited seats available
                    </p>
                    <p>Ideal for JEE/NEET/CA aspirants</p>
                    <p className="font-semibold text-[#589a44]">Apply early!</p>
                  </div>

                  <Separator className="my-6 bg-[#204735]/20" />

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#4a3728]/20 text-[#4a3728] hover:bg-[#4a3728] hover:text-white bg-white/50 backdrop-blur-sm transition-all duration-300 py-6 rounded-2xl font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-[#81b29a]/30 text-[#4a3728] hover:bg-[#81b29a] hover:text-white bg-white/50 backdrop-blur-sm transition-all duration-300 py-6 rounded-2xl font-semibold"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-[#204735]/20 p-4 z-50">
        <Button onClick={()=>{setIsApplyFormOpen(true)}} className="w-full bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white font-bold text-lg py-4 rounded-2xl shadow-lg">
          Apply for Stay - {hostel.rent}/month
        </Button>
      </div>

      {/* Footer */}
            <Footer/>
    </div>
  )
}
