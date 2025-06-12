import axios from 'axios';
import { AuthResponse, User, ServiceProvider, ServiceCategory, Booking, Review, PaginatedResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    user_type: string;
    location?: string;
  }) => api.post<AuthResponse>('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', credentials),

  getProfile: () => api.get<{ user: User }>('/auth/profile'),

  updateProfile: (userData: Partial<User>) =>
    api.put<{ user: User; message: string }>('/auth/profile', userData),
};

// Services API
export const servicesAPI = {
  getCategories: () => api.get<{ categories: ServiceCategory[] }>('/services/categories'),

  getProviders: (params?: {
    page?: number;
    per_page?: number;
    category_id?: number;
    location?: string;
    search?: string;
    min_rating?: number;
  }) => api.get<{ providers: ServiceProvider[]; total: number; pages: number; current_page: number }>('/services/providers', { params }),

  getProvider: (id: number) => api.get<{ provider: ServiceProvider }>(`/services/providers/${id}`),

  createProviderProfile: (providerData: {
    category_id: number;
    service_title: string;
    description: string;
    specialties?: string[];
    experience_years?: number;
    price_range_min?: number;
    price_range_max?: number;
    price_unit?: string;
    availability?: Record<string, any>;
    service_area?: string;
  }) => api.post<{ provider: ServiceProvider; message: string }>('/services/providers', providerData),

  updateProviderProfile: (id: number, providerData: Partial<ServiceProvider>) =>
    api.put<{ provider: ServiceProvider; message: string }>(`/services/providers/${id}`, providerData),
};

// Bookings API
export const bookingsAPI = {
  getBookings: (params?: {
    page?: number;
    per_page?: number;
    status?: string;
  }) => api.get<{ bookings: Booking[]; total: number; pages: number; current_page: number }>('/bookings', { params }),

  getBooking: (id: number) => api.get<{ booking: Booking }>(`/bookings/${id}`),

  createBooking: (bookingData: {
    provider_id: number;
    service_date: string;
    service_address: string;
    service_duration?: number;
    special_requirements?: string;
    estimated_price?: number;
  }) => api.post<{ booking: Booking; message: string }>('/bookings', bookingData),

  updateBookingStatus: (id: number, statusData: {
    status: string;
    notes?: string;
    final_price?: number;
  }) => api.put<{ booking: Booking; message: string }>(`/bookings/${id}/status`, statusData),
};

// Reviews API
export const reviewsAPI = {
  getProviderReviews: (providerId: number, params?: {
    page?: number;
    per_page?: number;
  }) => api.get<{ reviews: Review[]; total: number; pages: number; current_page: number }>(`/reviews/provider/${providerId}`, { params }),

  createReview: (reviewData: {
    booking_id: number;
    rating: number;
    comment?: string;
  }) => api.post<{ review: Review; message: string }>('/reviews', reviewData),

  updateReview: (id: number, reviewData: {
    rating?: number;
    comment?: string;
  }) => api.put<{ review: Review; message: string }>(`/reviews/${id}`, reviewData),

  deleteReview: (id: number) => api.delete<{ message: string }>(`/reviews/${id}`),
};

export default api;