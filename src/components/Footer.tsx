import React from 'react'
import { Heart, Shield, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">GharKaKaam</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering skilled women by connecting them with clients in a safe, verified marketplace. 
              Building trust, creating opportunities, and fostering community support.
            </p>
            <div className="flex items-center space-x-2 text-green-400">
              <Shield className="h-5 w-5" />
              <span className="text-sm">100% Verified & Safe Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-300 hover:text-white transition-colors">Browse Services</a></li>
              <li><a href="/service-provider" className="text-gray-300 hover:text-white transition-colors">Become Provider</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">support@gharkakaam.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 GharKaKaam. Made with ❤️ for empowering women entrepreneurs.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer