import React from 'react'
import { 
  Heart, 
  Shield, 
  Users, 
  Award,
  Target,
  Eye,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every provider is thoroughly verified and background-checked for your peace of mind'
    },
    {
      icon: Heart,
      title: 'Women Empowerment',
      description: 'Creating opportunities for skilled women to become independent entrepreneurs'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Building a supportive network where women help and uplift each other'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'Maintaining high standards through continuous feedback and quality assurance'
    }
  ]

  const stats = [
    { number: '500+', label: 'Verified Providers' },
    { number: '2000+', label: 'Happy Customers' },
    { number: '15+', label: 'Cities Covered' },
    { number: '₹50L+', label: 'Earnings Generated' }
  ]

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Former tech executive passionate about women empowerment and social impact'
    },
    {
      name: 'Anjali Reddy',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert in operations and quality assurance with 10+ years experience'
    },
    {
      name: 'Meera Patel',
      role: 'Community Manager',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Building and nurturing our community of service providers and customers'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About GharKaKaam
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto">
            Empowering skilled women by creating a safe, trusted marketplace where they can showcase their talents and build sustainable businesses
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                To create a safe, verified platform where skilled women can connect with customers, 
                build their businesses, and achieve financial independence while maintaining the highest 
                standards of safety and quality.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Empowering women entrepreneurs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Ensuring customer safety and satisfaction</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Building trusted community connections</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <Eye className="h-8 w-8 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                To become India's most trusted women-centric service marketplace, where every skilled 
                woman has the opportunity to thrive as an entrepreneur and every customer feels safe 
                and satisfied with the services they receive.
              </p>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="font-semibold text-primary-900 mb-2">Impact Goal by 2025</h3>
                <p className="text-primary-700">
                  Empower 10,000+ women entrepreneurs across 50+ cities in India, 
                  creating sustainable livelihoods and strengthening communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at GharKaKaam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-pink-100">
              Growing stronger every day with our amazing community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-pink-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600">
              How GharKaKaam came to life
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              GharKaKaam was born from a simple observation: countless skilled women in our communities 
              had incredible talents but lacked a safe, trusted platform to showcase their services and 
              connect with customers who needed them.
            </p>
            
            <p className="text-lg leading-relaxed mb-6">
              Our founder, Priya Sharma, experienced this firsthand when she struggled to find reliable 
              home services for her family while also witnessing talented women in her neighborhood who 
              couldn't effectively market their skills. She realized that what was missing was not just 
              a marketplace, but a community built on trust, safety, and mutual support.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              In 2023, we launched GharKaKaam with a clear mission: to create a women-centric platform 
              where safety comes first, quality is guaranteed, and every interaction builds stronger 
              communities. We started in Mumbai with just 50 service providers and have grown to serve 
              thousands of families across multiple cities.
            </p>

            <p className="text-lg leading-relaxed">
              Today, GharKaKaam is more than just a service marketplace – it's a movement that's 
              transforming how skilled women build their businesses and how families find trusted help 
              for their daily needs. Every booking, every review, and every success story brings us 
              closer to our vision of empowering women entrepreneurs across India.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate women working to empower other women
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Whether you're looking for trusted services or want to become a service provider, 
            you're welcome in our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Find Services
            </a>
            <a href="/service-provider" className="btn-secondary border-white text-white hover:bg-white/10">
              Become a Provider
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About