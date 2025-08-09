"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Home, Mail, Phone, MapPin, MessageSquare, Send, CalendarDays, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Footer from "@/components/global/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionSuccess(false)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Contact form submitted:", formData)

    setIsSubmitting(false)
    setSubmissionSuccess(true)
    setFormData({
      // Clear form after successful submission
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! We'll get back to you soon.",
      variant: "default",
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
              Find Hostels
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4a3728]/10 to-[#81b29a]/10 pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#589a44]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#204735]/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-4xl mx-auto px-4"
        >
          <Badge className="bg-[#589a44]/20 text-[#4a3728] mb-6 text-sm px-4 py-2">📞 Get In Touch</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-[#4a3728] mb-6 leading-tight">
            Connect With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
              Gurukul House
            </span>
          </h1>
          <p className="text-xl text-[#4a3728]/70">
            Have questions, need support, or want to schedule a visit? We're here to help!
          </p>
        </motion.div>
      </section>

      {/* Contact Content Section */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-[#4a3728] mb-6">Reach Out to Us Directly</h2>
            <p className="text-lg text-[#4a3728]/80 leading-relaxed mb-8">
              Whether you're a prospective student, a parent, or a potential partner, our team is ready to assist you.
              Don't hesitate to get in touch.
            </p>

            <div className="space-y-6">
              <div className="flex items-start p-6 bg-[#f7f3e9] rounded-2xl border border-[#204735]/20 shadow-sm">
                <Mail className="w-6 h-6 mr-4 text-[#589a44] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#4a3728]">Email Us</h3>
                  <p className="text-[#4a3728]/70">For general inquiries and support.</p>
                  <Link
                    href="mailto:info@gurukulhouse.com"
                    className="text-[#589a44] hover:underline font-medium mt-2 block"
                  >
                    info@gurukulhouse.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start p-6 bg-[#f7f3e9] rounded-2xl border border-[#204735]/20 shadow-sm">
                <Phone className="w-6 h-6 mr-4 text-[#589a44] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#4a3728]">Call Our Helpline</h3>
                  <p className="text-[#4a3728]/70">Connect with our admissions team or customer support.</p>
                  <Link href="tel:+919876543210" className="text-[#589a44] hover:underline font-medium mt-2 block">
                    +91 98765 43210
                  </Link>
                </div>
              </div>

              <div className="flex items-start p-6 bg-[#f7f3e9] rounded-2xl border border-[#204735]/20 shadow-sm">
                <MapPin className="w-6 h-6 mr-4 text-[#589a44] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#4a3728]">Visit Our Headquarters</h3>
                  <p className="text-[#4a3728]/70">Schedule an appointment to visit our main office.</p>
                  <p className="font-medium mt-2 block text-[#4a3728]">[Your Company Address Here], India</p>
                </div>
              </div>

              <div className="flex items-start p-6 bg-[#f7f3e9] rounded-2xl border border-[#204735]/20 shadow-sm">
                <CalendarDays className="w-6 h-6 mr-4 text-[#589a44] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-[#4a3728]">Schedule a Hostel Tour</h3>
                  <p className="text-[#4a3728]/70">Experience Gurukul House firsthand. Book your visit today!</p>
                  <Link href="/apply-for-stay" className="text-[#589a44] hover:underline font-medium mt-2 block">
                    Request a Tour
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#204735]/20 space-y-6"
          >
            <h2 className="text-3xl font-bold text-[#4a3728] mb-6 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-[#589a44]" />
              Send Us a Message
            </h2>

            {submissionSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 text-green-800 p-4 rounded-xl flex items-center justify-center text-center mb-6"
              >
                <CheckCircle className="w-6 h-6 mr-3" />
                Your message has been sent successfully! We will get back to you soon.
              </motion.div>
            )}

            <div>
              <Label htmlFor="name" className="text-lg font-semibold text-[#4a3728] mb-2">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-lg font-semibold text-[#4a3728] mb-2">
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-lg font-semibold text-[#4a3728] mb-2">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Inquiry about hostel booking"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-lg font-semibold text-[#4a3728] mb-2">
                Your Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                className="mt-1 border-2 border-[#204735]/30 focus:border-[#589a44] rounded-xl px-4 py-3"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-[#589a44] to-[#204735] hover:from-[#204735] hover:to-[#589a44] text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-[#589a44]/25 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
              <Send className="ml-2 w-5 h-5" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
            <Footer/>
    </div>
  )
}
