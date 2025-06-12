import React, { useState, useEffect } from 'react'
import { 
  Search, 
  MapPin, 
  Star, 
  MessageCircle, 
  Shield,
  ChefHat,
  Scissors,
  GraduationCap,
  Palette,
  Filter,
  Clock,
  Award
} from 'lucide-react'
import { servicesAPI } from '../services/api'
import { ServiceProvider, ServiceCategory } from '../types'
import toast from 'react-hot-toast'

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [providers, setProviders] = useState<ServiceProvider[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    current_page: 1
  })

  const locations = [
    'All Locations',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Pune',
    'Chennai',
    'Hyderabad'
  ]

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProviders()
  }, [selectedCategory, searchTerm, selectedLocation])

  const fetchCategories = async () => {
    try {
      const response = await servicesAPI.getCategories()
      setCategories(response.data.categories)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    }
  }

  const fetchProviders = async () => {
    try {
      setIsLoading(true)
      const params: any = {
        per_page: 12
      }

      if (selectedCategory !== 'all') {
        const category = categories.find(c => c.name.toLowerCase().includes(selectedCategory))
        if (category) {
          params.category_id = category.id
        }
      }

      if (selectedLocation !== 'all') {
        params.location = selectedLocation
      }

      if (searchTerm) {
        params.search = searchTerm
      }

      const response = await servicesAPI.getProviders(params)
      setProviders(response.data.providers)
      setPagination({
        total: response.data.total,
        pages: response.data.pages,
        current_page: response.data.current_page
      })
    } catch (error) {
      console.error('Error fetching providers:', error)
      toast.error('Failed to load service providers')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppContact = (provider: ServiceProvider) => {
    const message = `Hi ${provider.user.name}, I found your profile on GharKaKaam and I'm interested in your ${provider.service_title} services. Could you please share more details?`
    const whatsappUrl = `https://wa.me/91${provider.user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const categoryOptions = [
    { id: 'all', name: 'All Services', icon: null },
    { id: 'cooking', name: 'Home Cooking', icon: ChefHat },
    { id: 'beauty', name: 'Beauty Services', icon: Scissors },
    { id: 'tutoring', name: 'Tutoring', icon: GraduationCap },
    { id: 'tailoring', name: 'Tailoring', icon: Palette }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Trusted Service Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with verified women professionals in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search services or providers..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="input-field pl-10 appearance-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location) => (
                  <option key={location} value={location.toLowerCase()}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="input-field pl-10 appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              {category.icon && <category.icon className="h-4 w-4" />}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {providers.length} service providers
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Service Providers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {providers.map((provider) => (
                <div key={provider.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  {/* Provider Image */}
                  <div className="relative h-48">
                    <img
                      src={provider.user.profile_image || `https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=300`}
                      alt={provider.user.name}
                      className="w-full h-full object-cover"
                    />
                    {provider.user.is_verified && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Provider Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{provider.user.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{provider.rating.toFixed(1)}</span>
                        <span className="text-sm text-gray-500">({provider.total_reviews})</span>
                      </div>
                    </div>

                    <p className="text-primary-600 font-medium mb-2">{provider.service_title}</p>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {provider.user.location}
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <Clock className="h-4 w-4 mr-1" />
                      {provider.experience_years} years experience
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.description}</p>

                    {/* Specialties */}
                    {provider.specialties && provider.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {provider.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-primary-50 text-primary-600 px-2 py-1 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price and Contact */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">
                        ₹{provider.price_range_min}-{provider.price_range_max}/{provider.price_unit}
                      </div>
                      <button
                        onClick={() => handleWhatsAppContact(provider)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors duration-200"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {providers.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or browse all categories
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Services