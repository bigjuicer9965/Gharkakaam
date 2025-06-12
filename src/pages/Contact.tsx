import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Clock,
  Send,
  Shield,
  Heart,
  HelpCircle,
  Users
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'customer'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you within 24 hours.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      userType: 'customer'
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+91 98765 43210',
      description: 'Mon-Sat, 9 AM - 7 PM',
      action: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@gharkakaam.com',
      description: 'We reply within 24 hours',
      action: 'mailto:support@gharkakaam.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      details: '+91 98765 43210',
      description: 'Quick responses via WhatsApp',
      action: 'https://wa.me/919876543210'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: 'Mumbai, Maharashtra',
      description: 'India - 400001',
      action: null
    }
  ]

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Browse our services, select a provider, and contact them directly via WhatsApp to discuss your requirements and schedule.'
    },
    {
      question: 'Are all service providers verified?',
      answer: 'Yes, every service provider goes through our comprehensive verification process including background checks and skill assessment.'
    },
    {
      question: 'How do I become a service provider?',
      answer: 'Fill out our application form, complete the verification process, and once approved, create your profile to start receiving bookings.'
    },
    {
      question: 'What if I\'m not satisfied with a service?',
      answer: 'Contact our support team immediately. We take all complaints seriously and work to resolve issues quickly and fairly.'
    },
    {
      question: 'How are payments handled?',
      answer: 'Payments are made directly between customers and service providers. We provide guidelines for safe payment practices.'
    },
    {
      question: 'Is there a booking fee?',
      answer: 'No, there are no booking fees for customers. Service providers pay a small commission only when they receive bookings.'
    }
  ]

  const supportCategories = [
    {
      icon: Users,
      title: 'For Customers',
      description: 'Help with booking services, payments, or general inquiries'
    },
    {
      icon: Heart,
      title: 'For Service Providers',
      description: 'Support with profile setup, bookings, or platform features'
    },
    {
      icon: Shield,
      title: 'Safety & Security',
      description: 'Report safety concerns or get help with verification'
    },
    {
      icon: HelpCircle,
      title: 'General Support',
      description: 'Any other questions or feedback about our platform'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
            We're here to help! Reach out to us for any questions, support, or feedback
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with our support team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.action ? (
                  <a
                    href={info.action}
                    className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                  >
                    {info.details}
                  </a>
                ) : (
                  <p className="text-primary-600 font-medium">{info.details}</p>
                )}
                <p className="text-gray-600 text-sm mt-1">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Can We Help You With?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the category that best describes your inquiry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <category.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="input-field"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a *
                  </label>
                  <select
                    name="userType"
                    required
                    className="input-field"
                    value={formData.userType}
                    onChange={handleInputChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="provider">Service Provider</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="input-field"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="input-field"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Clock className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Support Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Phone & Email Support</h3>
              <p className="text-pink-100">Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="text-pink-100">Sunday: 10:00 AM - 5:00 PM</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-pink-100">Available 24/7</p>
              <p className="text-pink-100">Quick responses during business hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact