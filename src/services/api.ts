const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import toast from 'react-hot-toast';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

// ========================
// Generic fetch helpers & In-Memory Caching
// ========================

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('pak99_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

let activeRequests = 0;

function startLoader() {
  if (activeRequests === 0) {
    NProgress.start();
  }
  activeRequests++;
}

function stopLoader() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) {
    NProgress.done();
  }
}

interface CacheItem {
  data: any;
  timestamp: number;
}
const apiCache = new Map<string, CacheItem>();
const CACHE_DURATION_MS = 2 * 60 * 1000; // 2 minutes

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const isGet = !options?.method || options.method === 'GET';
  const isAdmin = !!localStorage.getItem('pak99_admin_token');

  // 1. Serve from cache if it's a GET request, user is not admin, and cache is fresh
  if (isGet && !isAdmin) {
    const cached = apiCache.get(endpoint);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
      return cached.data as T;
    }
  }

  // 2. Clear cache if this is a mutating request (POST, PUT, DELETE)
  if (!isGet) {
    apiCache.clear();
  }

  startLoader();
  try {
    const fetchOptions: RequestInit = {
      headers: getAuthHeaders(),
      ...options,
    };
    
    // Prevent browser caching for GET requests when logged in as admin
    if (isGet && isAdmin) {
      fetchOptions.cache = 'no-store';
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };
    }

    const res = await fetch(`${API_BASE}${endpoint}`, fetchOptions);
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      const errorMessage = error.error || error.message || 'API request failed';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await res.json();
    
    // 3. Save to cache
    if (isGet && !isAdmin) {
      apiCache.set(endpoint, { data, timestamp: Date.now() });
    }
    
    return data;
  } finally {
    stopLoader();
  }
}

// ========================
// Auth API
// ========================
export const authAPI = {
  login: (email: string, password: string) =>
    apiFetch<{ token: string; admin: { id: string; email: string; name: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getMe: () => apiFetch<{ _id: string; email: string; name: string }>('/auth/me'),
};

// ========================
// Generic CRUD API factory
// ========================
function createCrudAPI<T extends { _id?: string; id?: string }>(resource: string) {
  return {
    getAll: async () => {
      const data = await apiFetch<T[]>(`/${resource}`);
      return data.map(item => ({ ...item, id: item._id }));
    },
    getById: async (id: string) => {
      const item = await apiFetch<T>(`/${resource}/${id}`);
      return { ...item, id: item._id };
    },
    create: (data: Partial<T>) =>
      apiFetch<T>(`/${resource}`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<T>) =>
      apiFetch<T>(`/${resource}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiFetch<{ message: string }>(`/${resource}/${id}`, {
        method: 'DELETE',
      }),
  };
}

// ========================
// Resource APIs
// ========================

export interface ApiTicketFlight {
  date: string;
  time: string;
  bag: string;
  meal: boolean;
  fare: string;
  seats: string;
}

export interface ApiTicketGroup {
  _id?: string;
  title: string;
  buttonText: string;
  image: string;
  airlineName: string;
  airlineLogo?: string;
  routeDisplay: string;
  flights: ApiTicketFlight[];
}

export interface ApiInsuranceService {
  _id?: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  buttonText: string;
  inquiryType: string;
}

export interface ApiStudyItem {
  title: string;
  description: string;
  icon?: string;
  funding?: string;
  target?: string;
  buttonText?: string;
}

export interface ApiStudyProgram {
  _id?: string;
  slug: string;
  pageType: 'destination' | 'scholarship' | 'attestation';
  badgeText?: string;
  cardIcon?: string;
  title: string;
  description: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  items: ApiStudyItem[];
}

export interface ApiTour {
  id?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  aboutInfo?: string;
  funFacts?: string[];
  _id?: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  pricePKR: number;
  couplePricePKR?: number;
  originalPricePKR?: number;
  departure?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  featured?: boolean;
  popular?: boolean;
  description: string;
  highlights: string[];
  inclusions: string[];
  itinerary: { day: number; title: string; detail: string }[];
}

export interface ApiUmrahPackage {
  _id?: string;
  packageId: string;
  city: string;
  tier: string;
  departureDate: string;
  durationText: string;
  flightRoute: string;
  airline: string;
  hotels: { makkah: string; madinah: string };
  pricing?: {
    sharing?: string;
    quad?: string;
    triple?: string;
    double?: string;
  };
  seatsAvailable?: number;
  airlineLogo?: string;
  makkahHotelIcon?: string;
  madinahHotelIcon?: string;
}

export interface ApiVisaCountry {
  _id?: string;
  name: string;
  code: string;
  customUrl?: string;
  normalDocs: string[];
  doneBaseDocs: string[];
  note?: string;
  duration?: string;
  visaType?: string;
  normalCharges?: string;
  doneBaseCharges?: string;
  processingTime?: string;
}

export interface ApiDestination {
  _id?: string;
  destinationId: string;
  title: string;
  subtitle: string;
  bestTime: string;
  sliderImages: string[];
  aboutInfo: string;
  funFacts: string[];
}

export interface ApiBlog {
  _id?: string;
  title: string;
  category: string;
  date: string;
  readTime?: string;
  image: string;
  excerpt: string;
  content?: string;
  published: boolean;
}

export interface ApiHotel {
  _id?: string;
  name: string;
  location: string;
  rating: number;
  price: string;
  image: string;
  amenities: string[];
}

export interface ApiReview {
  _id?: string;
  name: string;
  role: string;
  location?: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface ApiCarousel {
  _id?: string;
  name: string;
  images: string[];
}

export const toursAPI = createCrudAPI<ApiTour>('tours');
export const umrahAPI = createCrudAPI<ApiUmrahPackage>('umrah');
export const visasAPI = createCrudAPI<ApiVisaCountry>('visas');
export const destinationsAPI = createCrudAPI<ApiDestination>('destinations');
export const blogsAPI = createCrudAPI<ApiBlog>('blogs');
export const hotelsAPI = createCrudAPI<ApiHotel>('hotels');
export const reviewsAPI = createCrudAPI<ApiReview>('reviews');
export const carouselsAPI = createCrudAPI<ApiCarousel>('carousels');
export const ticketGroupsAPI = createCrudAPI<ApiTicketGroup>('ticket-groups');
export const insuranceAPI = createCrudAPI<ApiInsuranceService>('insurance');
export const studyAPI = createCrudAPI<ApiStudyProgram>('study');

export const settingsAPI = {
  get: () => apiFetch<Record<string, any>>('/settings'),
  update: (updates: Record<string, any>) =>
    apiFetch<Record<string, any>>('/settings', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
};

// ========================
// Upload API
// ========================
export const uploadAPI = {
  uploadImage: async (file: File): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData();
    formData.append('image', file);
    const token = localStorage.getItem('pak99_admin_token');
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  },
  uploadMultiple: async (files: File[]): Promise<{ url: string; publicId: string }[]> => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    const token = localStorage.getItem('pak99_admin_token');
    const res = await fetch(`${API_BASE}/upload/multiple`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });
    if (!res.ok) throw new Error('Upload failed');
    return res.json();
  },
  deleteImage: async (url: string): Promise<void> => {
    const token = localStorage.getItem('pak99_admin_token');
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error('Delete failed');
  }
};

