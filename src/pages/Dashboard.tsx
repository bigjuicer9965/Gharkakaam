import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI, servicesAPI } from '../services/api';
import { Booking, ServiceProvider } from '../types';
import { Calendar, Clock, MapPin, Star, TrendingUp, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providerProfile, setProviderProfile] = useState<ServiceProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
    averageRating: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch bookings
      const bookingsResponse = await bookingsAPI.getBookings({ per_page: 10 });
      setBookings(bookingsResponse.data.bookings);

      // If user is a provider, fetch their profile
      if (user?.user_type === 'provider') {
        try {
          const providersResponse = await servicesAPI.getProviders({ per_page: 1 });
          const userProvider = providersResponse.data.providers.find(p => p.user_id === user.id);
          if (userProvider) {
            setProviderProfile(userProvider);
            setStats({
              totalBookings: userProvider.total_bookings,
              completedBookings: bookingsResponse.data.bookings.filter(b => b.status === 'completed').length,
              totalEarnings: bookingsResponse.data.bookings
                .filter(b => b.status === 'completed' && b.final_price)
                .reduce((sum, b) => sum + (b.final_price || 0), 0),
              averageRating: userProvider.rating
            });
          }
        } catch (error) {
          console.error('Error fetching provider profile:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {user?.user_type === 'provider' 
              ? 'Manage your services and bookings' 
              : 'Track your bookings and find new services'
            }
          </p>
        </div>

        {/* Stats Cards for Providers */}
        {user?.user_type === 'provider' && providerProfile && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalEarnings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          </div>
          
          {bookings.length === 0 ? (
            <div className="p-6 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600">
                {user?.user_type === 'provider' 
                  ? 'Your bookings will appear here once customers start booking your services.'
                  : 'Start browsing services to make your first booking!'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {user?.user_type === 'provider' 
                              ? booking.customer.name 
                              : booking.provider.service_title
                            }
                          </h3>
                          <p className="text-sm text-gray-600">
                            {user?.user_type === 'provider' 
                              ? booking.provider.service_title
                              : `by ${booking.provider.user.name}`
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(booking.service_date), 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(booking.service_date), 'hh:mm a')}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.service_address.substring(0, 30)}...
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {booking.final_price && (
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{booking.final_price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {user?.user_type === 'provider' ? (
                <>
                  <a
                    href="/service-provider"
                    className="block w-full text-left px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    Update Profile
                  </a>
                  <a
                    href="/bookings"
                    className="block w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    View All Bookings
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/services"
                    className="block w-full text-left px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
                  >
                    Browse Services
                  </a>
                  <a
                    href="/bookings"
                    className="block w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    My Bookings
                  </a>
                </>
              )}
            </div>
          </div>

          {user?.user_type === 'provider' && providerProfile && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profile Approved</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    providerProfile.is_approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {providerProfile.is_approved ? 'Yes' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium">{providerProfile.total_reviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Service Area</span>
                  <span className="font-medium">{providerProfile.service_area || 'Not set'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;