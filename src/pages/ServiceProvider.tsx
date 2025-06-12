import React, { useState } from 'react'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Star,
  Shield,
  CheckCircle,
  Upload,
  MessageCircle,
  Award,
  TrendingUp,
  Users
} from 'lucide-react'

const ServiceProvider = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    category: '',
    experience: '',
    description: '',
    specialties: '',
    pricing: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Thank you for your application! We will review and contact you within 24 hours.')
  }

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Grow Your Business',
      description: 'Reach thousands of potential customers in your area'
    },
    {
      icon: Shield,
      title: 'Safe Platform',
      description: 'Verified customers and secure payment processing'
    },
    {
      icon: MessageCircle,
      title: 'Easy Communication',
      description: 'Connect with customers directly through WhatsApp'
    },
    {
      icon: Award,
      title: 'Build Reputation',
      description: 'Earn reviews and build your professional profile'
    }
  ]

  const steps = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Fill out our simple application form with your details and experience'
    },
    {
      step: 2,
      title: 'Verification Process',
      description: 'We verify your identity, skills, and background for safety'
    },
    {
      step: 3,
      title: 'Profile Creation',
      description: 'Create your professional profile with photos and service details'
    },
    {
      step: 4,
      title: 'Start Earning',
      description: 'Begin receiving bookings and grow your business'
    }
  ]

  const categories = [
    'Home Cooking & Catering',
    'Beauty Services',
    'Tutoring & Education',
    'Tailoring & Embroidery',
    'Cleaning Services',
    'Childcare',
    'Elderly Care',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Become a Service Provider
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100">
            Join our community of empowered women entrepreneurs and start earning from your skills
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-pink-200 text-sm">Active Providers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">₹25K</div>
              <div className="text-pink-200 text-sm">Avg Monthly Earning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">4.8★</div>
              <div className="text-pink-200 text-sm">Provider Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24hrs</div>
              <div className="text-pink-200 text-sm">Approval Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join GharKaKaam?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to succeed as an independent service provider
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to join our platform and start earning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Apply to Join Our Platform
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="input-field"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="input-field"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Area, City"
                    />
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-primary-600" />
                  Service Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Category *
                    </label>
                    <select
                      name="category"
                      required
                      className="input-field"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <select
                      name="experience"
                      required
                      className="input-field"
                      value={formData.experience}
                      onChange={handleInputChange}
                    >
                      <option value="">Select experience</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-10 years">6-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    className="input-field"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your services and what makes you unique..."
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialties
                    </label>
                    <input
                      type="text"
                      name="specialties"
                      className="input-field"
                      value={formData.specialties}
                      onChange={handleInputChange}
                      placeholder="e.g., North Indian, Bridal Makeup, Math Tutoring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pricing Range
                    </label>
                    <input
                      type="text"
                      name="pricing"
                      className="input-field"
                      value={formData.pricing}
                      onChange={handleInputChange}
                      placeholder="e.g., ₹500-1000/hour"
                    />
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Upload className="h-5 w-5 mr-2 text-primary-600" />
                  Documents (Optional)
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload certificates, portfolio, or ID proof</p>
                  <p className="text-sm text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  <button
                    type="button"
                    className="mt-4 bg-primary-50 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Terms and Submit */}
              <div>
                <div className="flex items-start space-x-3 mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the Terms of Service and Privacy Policy. I understand that my profile will be verified before activation.
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from women who transformed their skills into successful businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Sunita"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sunita Sharma</h4>
                  <p className="text-sm text-gray-600">Home Cook</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "GharKaKaam helped me turn my cooking passion into a thriving business. I now earn ₹30,000 monthly and have regular customers who love my food."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>4.9 rating • 127 reviews</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Priya"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Patel</h4>
                  <p className="text-sm text-gray-600">Makeup Artist</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The platform gave me the confidence to start my own beauty business. The verification system makes clients trust me, and I've built a loyal customer base."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>4.8 rating • 89 reviews</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Meera"
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Meera Gupta</h4>
                  <p className="text-sm text-gray-600">Math Tutor</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Teaching has always been my passion. Through GharKaKaam, I found students who appreciate my teaching style and I'm earning while doing what I love."
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>4.9 rating • 156 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceProvider