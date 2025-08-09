"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Users, BookOpen, Heart, Calendar, ArrowRight, Quote, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Footer from "@/components/global/footer"

const values = [
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description:
      "We foster an environment where learning thrives through structured study hours, peer mentoring, and comprehensive academic support.",
    color: "from-[#589a44] to-[#204735]",
  },
  {
    icon: Heart,
    title: "Holistic Development",
    description:
      "Beyond academics, we nurture character, spirituality, and personal growth through meditation, yoga, and value-based living.",
    color: "from-[#81b29a] to-[#4a3728]",
  },
  {
    icon: Users,
    title: "Community Spirit",
    description:
      "We build lasting bonds through shared experiences, collaborative learning, and a supportive peer network.",
    color: "from-[#204735] to-[#589a44]",
  },
  {
    icon: Shield,
    title: "Safety & Security",
    description:
      "We provide a secure, monitored environment where students can focus on their goals with complete peace of mind.",
    color: "from-[#589a44] to-[#204735]",
  },
]

const milestones = [
  {
    year: "2015",
    title: "Foundation",
    description:
      "Started with our first hostel in Kota, serving 50 JEE aspirants with a vision to blend traditional values with modern education.",
  },
  {
    year: "2017",
    title: "Expansion",
    description:
      "Opened hostels in Delhi and Pune, expanding our reach to NEET and CA aspirants while maintaining our core values.",
  },
  {
    year: "2019",
    title: "Recognition",
    description:
      "Achieved 90% success rate among residents, establishing ourselves as a trusted name in student accommodation.",
  },
  {
    year: "2021",
    title: "Digital Innovation",
    description:
      "Introduced smart facilities, online mentoring programs, and digital learning resources during the pandemic.",
  },
  {
    year: "2023",
    title: "National Presence",
    description:
      "Expanded to 15+ cities with 50+ hostels, serving over 5000 students annually across various competitive exams.",
  },
  {
    year: "2025",
    title: "Future Vision",
    description:
      "Launching advanced study programs, AI-powered learning assistance, and sustainable living initiatives.",
  },
]

const team = [
  {
    name: "Dr. Rajesh Sharma",
    role: "Founder & Chairman",
    description:
      "Former IIT professor with 25+ years in education. Envisioned Gurukul House to bridge ancient wisdom with modern learning.",
    image: "/placeholder.svg?height=300&width=300",
    achievement: "IIT Delhi Alumnus",
  },
  {
    name: "Priya Agarwal",
    role: "Chief Operations Officer",
    description:
      "MBA from IIM with expertise in hospitality management. Ensures world-class facilities and student experience.",
    image: "/placeholder.svg?height=300&width=300",
    achievement: "IIM Bangalore Alumnus",
  },
  {
    name: "Amit Kumar",
    role: "Academic Director",
    description:
      "Former coaching institute head with deep understanding of competitive exam preparation and student psychology.",
    image: "/placeholder.svg?height=300&width=300",
    achievement: "15+ Years in Education",
  },
]

const achievements = [
  { number: "5000+", label: "Students Served", icon: "🎓" },
  { number: "90%", label: "Success Rate", icon: "🏆" },
  { number: "50+", label: "Hostels", icon: "🏠" },
  { number: "15+", label: "Cities", icon: "🌍" },
]

export default function AboutPage() {
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
            <Link href="/about" className="text-[#589a44] text-sm font-medium">
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#589a44]/20 to-[#204735]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-[#81b29a]/20 to-[#4a3728]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 pt-20"
            >
              <Badge className="bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 mb-6 text-sm px-4 py-2">
                🕉️ Our Story
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-[#4a3728] mb-8 leading-tight">
                Where Ancient
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                  Wisdom Meets
                </span>
                Modern Dreams
              </h1>

              <p className="text-xl text-[#4a3728]/70 mb-10 leading-relaxed max-w-2xl">
                Founded on the timeless principles of the gurukul tradition, we've created a modern sanctuary where
                students don't just prepare for exams—they prepare for life. Our journey began with a simple belief:
                that true education encompasses both academic excellence and character development.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/hostels">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                  >
                    Join Our Community
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#4a3728]/20 text-[#4a3728] hover:bg-[#4a3728] hover:text-white px-8 py-6 text-lg rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300"
                >
                  Our Mission
                </Button>
              </div>

              {/* Achievement Stats */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-[#204735]/20 shadow-lg"
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-2xl font-bold text-[#589a44]">{achievement.number}</div>
                    <div className="text-xs text-[#4a3728]/60 font-medium">{achievement.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Images */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-5 relative h-[600px]"
            >
              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-80 h-96 rounded-3xl overflow-hidden shadow-2xl transform rotate-3"
              >
                <Image
                  src="/placeholder.svg?height=400&width=320&text=Gurukul+Tradition"
                  alt="Gurukul tradition"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3728]/30 to-transparent" />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute bottom-20 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6"
              >
                <Image
                  src="/placeholder.svg?height=320&width=256&text=Modern+Learning"
                  alt="Modern learning"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Quote Card */}
              <motion.div
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute top-32 left-8 bg-white rounded-2xl p-6 shadow-2xl border border-[#204735]/20 max-w-xs"
              >
                <Quote className="w-8 h-8 text-[#589a44]/30 mb-3" />
                <p className="text-sm text-[#4a3728] font-medium italic">
                  "Education is not preparation for life; education is life itself."
                </p>
                <p className="text-xs text-[#4a3728]/60 mt-2">- Ancient Gurukul Wisdom</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-32 bg-white" style={{ clipPath: "polygon(0 15%, 100% 0%, 100% 85%, 0% 100%)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge className="bg-[#589a44]/20 text-[#4a3728] hover:bg-[#589a44]/30 mb-6">Our Values</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-6">
              Built on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Timeless Principles
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70 max-w-2xl mx-auto">
              Our core values guide everything we do, from the way we design our spaces to how we support our students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
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
                      className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#4a3728] mb-4">{value.title}</h3>
                    <p className="text-[#4a3728]/70 leading-relaxed">{value.description}</p>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#589a44]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-32 bg-[#f7f3e9] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-[#81b29a]/20 text-[#4a3728] hover:bg-[#81b29a]/30 mb-6">Our Journey</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-[#4a3728] mb-6">
              A Decade of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Growth & Impact
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70 max-w-2xl mx-auto">
              From a single hostel to a nationwide network, our journey reflects our commitment to student success.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#589a44] to-[#204735] rounded-full" />

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Calendar className="w-5 h-5 text-[#589a44] mr-2" />
                          <span className="text-[#589a44] font-bold text-lg">{milestone.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#4a3728] mb-3">{milestone.title}</h3>
                        <p className="text-[#4a3728]/70 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#589a44] to-[#204735] rounded-full border-4 border-white shadow-lg" />
                  </div>

                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-6">Leadership Team</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Meet the <span className="text-[#589a44]">Visionaries</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our leadership team combines decades of experience in education, hospitality, and student development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`${index === 1 ? "md:translate-y-8" : ""}`}
              >
                <Card className="border-0 shadow-2xl bg-white rounded-3xl h-full overflow-hidden">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#589a44] text-white">{member.achievement}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-[#4a3728] mb-2">{member.name}</h3>
                    <p className="text-[#589a44] font-semibold mb-4">{member.role}</p>
                    <p className="text-[#4a3728]/70 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to Be Part of Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
                Legacy?
              </span>
            </h2>
            <p className="text-xl text-[#4a3728]/70 mb-12 leading-relaxed">
              Join thousands of students who have found their home away from home at Gurukul House.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/hostels">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-12 py-8 text-xl rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
                >
                  Explore Our Hostels
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-[#4a3728] text-[#4a3728] hover:bg-[#4a3728] hover:text-white px-12 py-8 text-xl rounded-2xl bg-white/50 backdrop-blur-sm transition-all duration-300"
              >
                Contact Us
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
