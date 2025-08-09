"use client"

import { motion } from "framer-motion"
import { Home, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/global/footer"

export default function TermsConditionsPage() {
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
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#589a44]/10 to-[#204735]/10 pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#81b29a]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#4a3728]/10 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-4xl mx-auto px-4"
        >
          <Badge className="bg-[#81b29a]/20 text-[#4a3728] mb-6 text-sm px-4 py-2">⚖️ Our Policies</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-[#4a3728] mb-6 leading-tight">
            Terms &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">
              Conditions
            </span>
          </h1>
          <p className="text-xl text-[#4a3728]/70">
            By using Gurukul House services, you agree to abide by these terms.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="max-w-4xl mx-auto px-4 text-[#4a3728]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-6">1. Acceptance of Terms</h2>
            <p className="mb-6 leading-relaxed">
              By accessing and using the Gurukul House website, mobile application, and related services (collectively,
              the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all
              the terms and conditions of this agreement, then you may not access the Services or use any services.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">2. Changes to Terms</h2>
            <p className="mb-6 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the
              new Terms on this page. Your continued use of the Services after such modifications will constitute your
              acknowledgement of the modified Terms and agreement to abide and be bound by the modified Terms.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">3. Eligibility</h2>
            <p className="mb-6 leading-relaxed">
              You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
              that you are at least 18 years old and have the legal capacity to enter into this agreement.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">4. User Accounts</h2>
            <h3 className="text-2xl font-semibold mb-4">Registration</h3>
            <p className="mb-4 leading-relaxed">
              To access certain features of the Services, you may be required to register for an account. You agree to
              provide accurate, current, and complete information during the registration process and to update such
              information to keep it accurate, current, and complete.
            </p>
            <h3 className="text-2xl font-semibold mb-4 mt-6">Account Security</h3>
            <p className="mb-6 leading-relaxed">
              You are responsible for safeguarding your password and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">5. Booking and Payments</h2>
            <h3 className="text-2xl font-semibold mb-4">Hostel Bookings</h3>
            <p className="mb-4 leading-relaxed">
              All bookings made through the Services are subject to availability and the terms and conditions of the
              respective hostel. Gurukul House acts as a facilitator and is not responsible for any disputes arising
              directly between the user and the hostel.
            </p>
            <h3 className="text-2xl font-semibold mb-4 mt-6">Payment Terms</h3>
            <p className="mb-6 leading-relaxed">
              Payments for bookings must be made through the payment methods provided on the Services. You agree to pay
              all fees and charges incurred in connection with your bookings at the prices in effect when such charges
              are incurred.
            </p>
            <h3 className="text-2xl font-semibold mb-4 mt-6">Cancellations and Refunds</h3>
            <p className="mb-6 leading-relaxed">
              Cancellation policies and refund eligibility vary by hostel and booking type. Please review the specific
              terms for each booking before confirming.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">6. User Conduct</h2>
            <p className="mb-6 leading-relaxed">
              You agree not to use the Services for any unlawful purpose or in any way that might harm, defame, or
              harass others. Prohibited activities include, but are not limited to:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
              <li>Posting false, inaccurate, or misleading information.</li>
              <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Services.</li>
              <li>Attempting to gain unauthorized access to our systems or networks.</li>
              <li>Interfering with the proper working of the Services.</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-10">7. Intellectual Property</h2>
            <p className="mb-6 leading-relaxed">
              All content on the Services, including text, graphics, logos, images, and software, is the property of
              Gurukul House or its content suppliers and protected by intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works of any content without our express written permission.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">8. Disclaimers and Limitation of Liability</h2>
            <p className="mb-6 leading-relaxed">
              The Services are provided "as is" and "as available" without any warranties of any kind, either express or
              implied. Gurukul House does not guarantee the accuracy, completeness, or reliability of any content
              available through the Services. In no event shall Gurukul House be liable for any direct, indirect,
              incidental, special, consequential, or punitive damages arising out of your use of or inability to use the
              Services.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">9. Governing Law</h2>
            <p className="mb-6 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
              conflict of law provisions.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">10. Contact Us</h2>
            <p className="mb-6 leading-relaxed">If you have any questions about these Terms, please contact us at:</p>
            <address className="not-italic space-y-2 mb-10 leading-relaxed">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#589a44]" />
                info@gurukulhouse.com
              </p>
              <p className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#589a44]" />
                [Your Company Address Here], India
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-[#589a44]" />
                +91 98765 43210
              </p>
            </address>

            <p className="text-sm text-[#4a3728]/60 mt-8">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
   <Footer/>
    </div>
  )
}
