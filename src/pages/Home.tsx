import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  Star, 
  Users, 
  CheckCircle, 
  Heart,
  MessageCircle,
  Award,
  Clock,
  MapPin,
  ChefHat,
  Scissors,
  GraduationCap,
  Palette
} from 'lucide-react'

const Home = () => {
  const services = [
    {
      icon: ChefHat,
      title: 'Home Cooking',
      description: 'Authentic home-cooked meals and catering services',
      providers: '150+ Cooks'
    },
    {
      icon: Scissors,
      title: 'Beauty Services',
      description: 'Hair styling, makeup, and beauty treatments at home',
      providers: '80+ Beauticians'
    },
    {
      icon: GraduationCap,
      title: 'Tutoring',
      description: 'Academic support and skill development classes',
      providers: '200+ Tutors'
    },
    {
      icon: Palette,
      title: 'Tailoring',
      description: 'Custom clothing, alterations, and embroidery work',
      providers: '120+ Tailors'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All service providers are background-checked and verified for your safety'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Easy communication and booking through WhatsApp for convenience'
    },
    {
      icon: Star,
      title: 'Trusted Reviews',
      description: 'Real reviews from verified customers to help you make informed decisions'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Regular quality checks and customer feedback monitoring'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Working Mother',
      content: 'GharKaKaam helped me find an amazing cook who prepares healthy meals for my family. The verification process gave me complete peace of mind.',
      rating: 5
    },
    {
      name: 'Sunita Devi',
      role: 'Service Provider',
      content: 'As a beautician, this platform helped me reach more clients safely. The support team is very helpful and the payment system is reliable.',
      rating: 5
    },
    {
      name: 'Meera Patel',
      role: 'Homemaker',
      content: 'Found an excellent tutor for my daughter through GharKaKaam. The reviews and ratings system made it easy to choose the right person.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Empowering Women,<br />
            <span className="text-pink-200">Building Communities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-3xl mx-auto">
            Connect with skilled women professionals for home services. Safe, verified, and trusted by thousands of families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Browse Services
            </Link>
            <Link to="/service-provider" className="btn-secondary border-white text-white hover:bg-white/10">
              Become a Provider
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-pink-200">Verified Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2000+</div>
              <div className="text-pink-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-pink-200">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8★</div>
              <div className="text-pink-200">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover skilled women professionals ready to help with your daily needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 card-hover border border-gray-100">
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-sm text-primary-600 font-medium">
                  <Users className="h-4 w-4 mr-1" />
                  {service.providers}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GharKaKaam?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We prioritize safety, quality, and convenience in every interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect with trusted service providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Browse & Select</h3>
              <p className="text-gray-600">
                Browse verified service providers in your area and read reviews from other customers
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect via WhatsApp</h3>
              <p className="text-gray-600">
                Contact your chosen provider directly through WhatsApp to discuss requirements and schedule
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enjoy Service</h3>
              <p className="text-gray-600">
                Receive quality service and leave a review to help other women in the community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from women who trust GharKaKaam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 card-hover">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Join thousands of women who trust GharKaKaam for their daily needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Find Services Now
            </Link>
            <Link to="/service-provider" className="btn-secondary border-white text-white hover:bg-white/10">
              Start Earning Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home