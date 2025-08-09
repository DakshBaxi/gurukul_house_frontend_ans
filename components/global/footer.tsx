import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div>
               <footer className="bg-[#4a3728] text-white py-16 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#589a44] to-[#204735] rounded-2xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Gurukul House</h3>
                  <p className="text-sm text-white/60">Where Dreams Take Shape</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md">
                Creating the perfect environment for academic excellence through traditional values and modern
                amenities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  Home
                </Link>
                <Link href="/hostels" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  Hostels
                </Link>
                <Link href="/about" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Legal & Support</h4>
              <div className="space-y-3 text-white/70">
                <Link href="/privacy-policy" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms-and-conditions" className="block text-white/70 hover:text-[#589a44] transition-colors">
                  Terms & Conditions
                </Link>
                
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact Info</h4>
              <div className="space-y-3 text-white/70">
                <div className="flex items-center">
                  <span className="mr-2">📧</span>
                  info@gurukulhouse.com
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📞</span>
                  +91 98765 43210
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  Multiple locations across India
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Gurukul House. All rights reserved. Built with ❤️ for student success.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer