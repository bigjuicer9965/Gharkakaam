export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: 'customer' | 'provider' | 'admin';
  location: string;
  is_verified: boolean;
  is_active: boolean;
  profile_image?: string;
  created_at: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  is_active: boolean;
}

export interface ServiceProvider {
  id: number;
  user_id: number;
  user: User;
  category: ServiceCategory;
  service_title: string;
  description: string;
  specialties: string[];
  experience_years: number;
  price_range_min: number;
  price_range_max: number;
  price_unit: string;
  availability: Record<string, any>;
  service_area: string;
  rating: number;
  total_reviews: number;
  total_bookings: number;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: number;
  customer: User;
  provider: ServiceProvider;
  service_date: string;
  service_duration?: number;
  service_address: string;
  special_requirements?: string;
  estimated_price?: number;
  final_price?: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: string;
  notes?: string;
  created_at: string;
}

export interface Review {
  id: number;
  booking_id: number;
  customer: User;
  provider_id: number;
  rating: number;
  comment: string;
  is_verified: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pages: number;
  current_page: number;
}