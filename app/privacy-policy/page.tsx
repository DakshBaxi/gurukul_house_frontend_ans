"use client"

import { motion } from "framer-motion"
import { Home, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/global/footer"

export default function PrivacyPolicyPage() {
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
            {/* <Link href="/about" className="text-[#4a3728] hover:text-[#589a44] transition-colors text-sm font-medium">
              About
            </Link> */}
          </div>
          <Link href="/hostels">
            <Button size="sm" className="bg-[#589a44] hover:bg-[#204735] text-white rounded-full px-6">
              Find Hostels
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#81b29a]/10 to-[#4a3728]/10 pt-20">
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
          <Badge className="bg-[#589a44]/20 text-[#4a3728] mb-6 text-sm px-4 py-2">🔒 Your Privacy Matters</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-[#4a3728] mb-6 leading-tight">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#589a44] to-[#204735]">Policy</span>
          </h1>
          <p className="text-xl text-[#4a3728]/70">
            Understand how we collect, use, and protect your personal information at Gurukul House.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white relative z-20">
        <div className="max-w-4xl mx-auto px-4 text-[#4a3728]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-3xl font-bold mb-6">Introduction</h2>
            <p className="mb-6 leading-relaxed">
              Welcome to Gurukul House. We are committed to protecting your privacy and ensuring the security of your
              personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website, use our services, or interact with us.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">Information We Collect</h2>
            <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
            <p className="mb-4 leading-relaxed">
              We may collect personal information that you voluntarily provide to us when you register on the site,
              express an interest in obtaining information about us or our products and services, when you participate
              in activities on the website, or otherwise when you contact us. The personal information that we collect
              depends on the context of your interactions with us and the website, the choices you make and the products
              and features you use.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
              <li>Name, email address, phone number</li>
              <li>Date of birth, gender, nationality</li>
              <li>Academic details (e.g., course, institution)</li>
              <li>Payment information (e.g., bank account details, credit card numbers)</li>
              <li>Hostel preferences and stay duration</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-10">Automatically Collected Information</h3>
            <p className="mb-6 leading-relaxed">
              When you visit, use, or navigate the website, we may automatically collect certain information. This
              information does not reveal your specific identity (like your name or contact information) but may include
              device and usage information, such as your IP address, browser and device characteristics, operating
              system, language preferences, referring URLs, device name, country, location, information about how and
              when you use our website, and other technical information.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">How We Use Your Information</h2>
            <p className="mb-6 leading-relaxed">
              We use personal information collected via our website for a variety of business purposes described below.
              We process your personal information for these purposes in reliance on our legitimate business interests,
              in order to enter into or perform a contract with you, with your consent, and/or for compliance with our
              legal obligations.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
              <li>To facilitate account creation and logon process.</li>
              <li>To send you marketing and promotional communications.</li>
              <li>To send administrative information to you.</li>
              <li>To fulfill and manage your bookings and related services.</li>
              <li>To post testimonials with your consent.</li>
              <li>To protect our services.</li>
              <li>To respond to user inquiries and offer support.</li>
              <li>To enable user-to-user communication.</li>
              <li>To request feedback and contact you about your experience.</li>
              <li>To deliver targeted advertising to you.</li>
              <li>To comply with our legal obligations.</li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-10">Sharing Your Information</h2>
            <p className="mb-6 leading-relaxed">
              We only share information with your consent, to comply with laws, to provide you with services, to protect
              your rights, or to fulfill business obligations.
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2 leading-relaxed">
              <li>
                **Service Providers:** We may share your data with third-party vendors, service providers, contractors,
                or agents who perform services for us or on our behalf.
              </li>
              <li>
                **Business Transfers:** We may share or transfer your information in connection with, or during
                negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of
                our business to another company.
              </li>
              <li>
                **Affiliates:** We may share your information with our affiliates, in which case we will require those
                affiliates to honor this privacy policy.
              </li>
              <li>
                **Legal Obligations:** We may disclose your information where we are legally required to do so in order
                to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal
                process.
              </li>
            </ul>

            <h2 className="text-3xl font-bold mb-6 mt-10">Data Security</h2>
            <p className="mb-6 leading-relaxed">
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. However, despite our safeguards and efforts to secure
              your information, no electronic transmission over the Internet or information storage technology can be
              guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other
              unauthorized third parties will not be able to defeat our security and improperly collect, access, steal,
              or modify your information.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">Your Privacy Rights</h2>
            <p className="mb-6 leading-relaxed">
              In some regions, such as the European Economic Area (EEA) and California, you have rights that allow you
              greater access to and control over your personal information. These may include the right to request
              access to and obtain a copy of your personal information, to request rectification or erasure, to restrict
              the processing of your personal information, and if applicable, to data portability.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">Updates to This Policy</h2>
            <p className="mb-6 leading-relaxed">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
              “Revised” date and the updated version will be effective as soon as it is accessible. We encourage you to
              review this Privacy Policy frequently to be informed of how we are protecting your information.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">Contact Us</h2>
            <p className="mb-6 leading-relaxed">
              If you have questions or comments about this policy, you may email us at{" "}
              <Link href="mailto:info@gurukulhouse.com" className="text-[#589a44] hover:underline">
                info@gurukulhouse.com
              </Link>{" "}
              or contact us by post at:
            </p>
            <address className="not-italic space-y-2 mb-10 leading-relaxed">
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#589a44]" />
                Gurukul House Headquarters
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
