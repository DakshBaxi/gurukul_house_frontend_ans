"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BookOpen,
  Users,
  Home,
  Star,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  ChevronRight,
  Play,
  CheckCircle,
  Clock,
  Award,
  Headphones,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/global/footer"
import { IHostel } from "./hostels/page"
import { fetchHostelsData } from "@/lib/actions/api"

const features = [
  {
    icon: BookOpen,
    title: "Study-Focused Environment",
    description: "Silent hours, dedicated study halls, and peer mentoring systems designed for academic excellence.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description: "Daily meditation, yoga sessions, and spiritual guidance following ancient gurukul traditions.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Users,
    title: "Community Living",
    description: "Connect with like-minded students preparing for JEE, NEET, CA, and other competitive exams.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "24/7 security, CCTV monitoring, and a caring environment that feels like home.",
    color: "from-[#589a44] to-[#204735]",
  },
]

const whyChooseUs = [
  {
    icon: CheckCircle,
    title: "Proven Study Methods",
    description:
      "Time-tested techniques combining traditional gurukul wisdom with modern learning methodologies for optimal results.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Clock,
    title: "Structured Daily Routine",
    description:
      "Carefully planned schedules that balance study time, meals, exercise, and rest for maximum productivity.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Award,
    title: "Expert Guidance",
    description:
      "Access to experienced mentors and subject experts who understand the challenges of competitive exams.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Headphones,
    title: "24/7 Support System",
    description:
      "Round-the-clock assistance for academic doubts, personal concerns, and any challenges you might face.",
    color: "from-[#589a44] to-[#204735]",
  },
]

const stats = [
  { number: "50+", label: "Premium Hostels", icon: "🏠" },
  { number: "15+", label: "Cities Covered", icon: "🏙️" },
  { number: "5000+", label: "Bed Capacity", icon: "🛏️" },
  { number: "4.8", label: "Expected Rating", icon: "⭐" },
]

// const featuredHostels = [
//   {
//     id: "gurukul-heights",
//     name: "Gurukul Heights",
//     location: "Kota",
//     price: "₹8,000",
//     rating: 4.8,
//     image: "/images/room.jpg",
//     features: ["AC Rooms", "Study Hall", "Meditation"],
//     popular: true,
//   },
//   {
//     id: "tapasya-block",
//     name: "Tapasya Block",
//     location: "Delhi",
//     price: "₹10,000",
//     rating: 4.9,
//     image: "/images/room.jpg",
//     features: ["Library", "Gym", "WiFi"],
//     popular: false,
//   },
//   {
//     id: "vidya-vihar",
//     name: "Vidya Vihar",
//     location: "Pune",
//     price: "₹7,500",
//     rating: 4.7,
//     image: "/images/room.jpg",
//     features: ["Study Pods", "Yoga Hall", "Veg Meals"],
//     popular: false,
//   },
// ]

const faqs = [
  {
    question: "What makes Gurukul House different from other hostels?",
    answer:
      "Gurukul House combines traditional gurukul values with modern amenities. We focus on holistic development through structured study hours, meditation sessions, peer mentoring, and a supportive community environment specifically designed for competitive exam aspirants.",
  },
  {
    question: "What are the accommodation options available?",
    answer:
      "We offer various accommodation types including single AC rooms, double sharing AC rooms, and triple sharing rooms. All rooms come with study tables, storage space, high-speed WiFi, and 24/7 security. Prices range from ₹7,000 to ₹15,000 per month depending on the location and room type.",
  },
  {
    question: "Are meals included in the accommodation?",
    answer:
      "Yes, we provide nutritious vegetarian meals prepared with fresh ingredients. Our meal plans include breakfast, lunch, dinner, and evening snacks. We cater to different dietary preferences and ensure balanced nutrition to support your study routine.",
  },
  {
    question: "What study facilities are available?",
    answer:
      "Each hostel features dedicated study halls, group study pods, libraries with reference books, high-speed WiFi, and silent hours from 10 PM to 6 AM. We also have peer mentoring programs where senior students guide juniors in their preparation.",
  },
  {
    question: "Is there a curfew or specific rules?",
    answer:
      "We maintain a disciplined environment with structured timings. Silent hours are from 10 PM to 6 AM, and we have specific timings for meals and common area usage. These rules are designed to create an optimal study environment for all residents.",
  },
  {
    question: "How do I apply for accommodation?",
    answer:
      "You can apply online through our website or visit any of our hostels. The application process includes filling out a form, document verification, and a brief interaction. We recommend applying early as seats are limited, especially during peak admission seasons.",
  },
  {
    question: "What security measures are in place?",
    answer:
      "All our hostels have 24/7 security guards, CCTV monitoring, biometric access systems, and secure entry/exit protocols. We also have wardens available round-the-clock for any assistance or emergencies.",
  },
  {
    question: "Are there any additional facilities?",
    answer:
      "Yes, depending on the location, we offer gyms, meditation halls, recreational areas, laundry services, medical assistance, and counseling support. Some hostels also have sports facilities and common areas for relaxation.",
  },
]

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 50])
  const [featuredHostels, setFeaturedHostels] = useState<IHostel[]|null>();

  useEffect(() => {
    const fetchFeaturedHostels = async () => {
      try {
       
      const response = await fetchHostelsData();
        const hostels = response.slice(0,3);
        setFeaturedHostels(hostels);
        
      } catch (error) {
        console.error("Error fetching featured hostels:", error);
      }
    }
    fetchFeaturedHostels();
}, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-[#f7f3e9] overflow-hidden">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6  transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-[#204735]/20 rounded-full px-8 py-4 shadow-2xl md:left-1/2"
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
              Find Hostels
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section with Diagonal Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-[#589a44]/20 to-[#204735]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-[#81b29a]/20 to-[#4a3728]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4  relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 py-10 md:py-0 gap-8 items-center min-h-screen">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 pt-20"
            >
              <motion.div
                animate={{
                  x: mousePosition.x * 0.01,
                  y: mousePosition.y * 0.01,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <Badge className="bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 mb-6 text-sm px-4 py-2 mt-4 md:mt-0">
                  🕉️ Ancient Wisdom, Modern Success
                </Badge>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-[#4a3728] mb-8 leading-tight">
                Find Your Path 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                 to Academic Excellence
                </span>
              </h1>

              <p className="text-xl text-[#4a3728]/70 mb-10 leading-relaxed max-w-lg">
                Join thousands of students who have found their home away from home at Gurukul House.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/hostels">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                  >
                    Explore Hostels
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#4a3728]/20 text-[#4a3728] hover:bg-[#4a3728] hover:text-white px-8 py-6 text-lg rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Watch Story
                </Button>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#204735]/20 shadow-lg"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-[#589a44]">{stat.number}</div>
                    <div className="text-xs text-[#4a3728]/60 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Images */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 relative h-[600px] hidden md:block"
            >
              {/* Main Image */}
              <motion.div
                style={{ y: y1 }}
                className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-6"
              >
                <Image
                  src="/images/room.jpg"
                  alt="Students studying"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/20 to-transparent" />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform -rotate-12"
              >
                <Image
                  src="/images/room.jpg"
                  alt="Hostel environment"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Rating Card */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute top-32 left-8 bg-white rounded-2xl p-4 shadow-2xl border border-[#204735]/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#589a44] to-[#204735] rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#4a3728]">4.8/5</div>
                    <div className="text-sm text-[#4a3728]/60">Expected Rating</div>
                  </div>
                </div>
              </motion.div>

              {/* Success Badge */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="absolute bottom-8 right-16 bg-gradient-to-r from-[#589a44] to-[#204735] text-white rounded-2xl p-4 shadow-2xl"
              >
                <div className="text-sm font-semibold">Premium Facilities</div>
                <div className="text-xs opacity-80">Coming Soon...</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Diagonal Cut */}
      <div className="flex flex-col">
     

      {/* Featured Hostels - Asymmetric Layout */}
      <section className="relative py-32 md:order-2 order-1 bg-[#f7f3e9] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#589a44]/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <Badge className="bg-[#589a44]/20 text-[#4a3728] hover:bg-[#589a44]/30 mb-6">Featured Hostels</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#4a3728] mb-6">
                Popular{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                  Destinations
                </span>
              </h2>
              <p className="text-lg text-[#4a3728]/70 mb-8">
                Discover our most loved hostels across India, each designed to nurture your academic journey.
              </p>
              <Link href="/hostels">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#81b29a] hover:to-[#4a3728] text-white px-8 py-6 rounded-2xl"
                >
                  View All Hostels
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredHostels?.map((hostel, index) => (
                  <motion.div
                    key={hostel._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`${index === 0 ? "md:col-span-2" : ""} ${index === 1 ? "md:translate-y-8" : ""}`}
                  >
                    <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl">
                      <div className="relative overflow-hidden">
                        <Image
                          src={hostel.gallery&&hostel?.gallery[0] || "/placeholder.svg"}
                          alt={hostel.name}
                          width={400}
                          height={300}
                          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                            index === 0 ? "h-64" : "h-48"
                          }`}
                        />
                        {hostel.popular && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-[#589a44] to-[#204735] text-white">
                              🔥 Most Popular
                            </Badge>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-[#4a3728]">⭐ {hostel.rating}</Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#4a3728] mb-2">{hostel.name}</h3>
                        <div className="flex items-center text-[#4a3728]/60 mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{hostel.location}</span>
                        </div>
                        <div className="text-2xl font-bold text-[#589a44] mb-4">
                          {hostel.price}
                          <span className="text-sm font-normal text-[#4a3728]/60">/month</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hostel?.features?.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs bg-[#81b29a]/20 text-[#4a3728]">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/hostels/${hostel._id}`}>
                          <Button className="w-full bg-[#4a3728] text-white hover:bg-[#589a44] transition-all duration-300 rounded-xl">
                            View Details
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
       <section   className="relative py-32 md:order-1 order-2  bg-white md:[clip-path:polygon(0_15%,100%_0%,100%_85%,0%_100%)]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-6">
              More Than Just a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Place to Stay
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70 max-w-2xl mx-auto">
              We create an ecosystem where academic excellence meets personal growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl h-full overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4a3728] mb-4">{feature.title}</h3>
                    <p className="text-[#4a3728]/70 leading-relaxed">{feature.description}</p>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#589a44]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* Why Choose Us Section - Replacing Testimonials */}
      <section className="relative py-32 bg-gradient-to-br from-[#589a44] to-[#204735] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#589a44]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#204735]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your Success is <span className="text-[#f6f7f5]">Our Priority</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We've designed every aspect of our hostels to support your academic journey and personal growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, rotate: 2, scale: 1.02 }}
                className={`${index === 1 ? "lg:translate-y-8" : ""} ${index === 3 ? "lg:translate-y-4" : ""}`}
              >
                <Card className="border-0 shadow-2xl bg-white rounded-3xl h-full overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4a3728] mb-4">{reason.title}</h3>
                    <p className="text-[#4a3728]/70 leading-relaxed">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="relative py-32 bg-white overflow-hidden"
        style={{ clipPath: "polygon(0 15%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 mb-6">FAQ</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-6">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Questions
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70">Everything you need to know about Gurukul House</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border border-[#204735]/20 rounded-2xl px-6 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-semibold text-[#4a3728] hover:text-[#589a44] transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#4a3728]/70 leading-relaxed pb-6">{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Curved */}
      <section
        className="relative py-32 bg-[#f7f3e9] overflow-hidden"
        style={{ clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-8">
              Ready to Begin Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Success Journey?
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70 mb-12 leading-relaxed">
              Join thousands of students who have made Gurukul House their stepping stone to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/hostels">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                >
                  Find Your Hostel
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#4a3728] text-[#4a3728] hover:bg-[#4a3728] hover:text-white px-12 py-8 text-xl rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                Schedule a Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
              <Footer/>
    </div>
  )
}
