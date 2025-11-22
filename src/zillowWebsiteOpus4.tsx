// --- START OF FILE zillowWebsiteOpus4.tsx ---

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Bed, Bath, Square, MapPin, Heart, Filter, Home, Moon, Sun, X, Calendar, DollarSign, School, Hammer, ChevronRight, TrendingUp, HandCoins, UserCheck, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'house' | 'apartment' | 'condo';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  featured: boolean;
  description: string;
  features: string[];
  interiorFeatures: {
    heating: string;
    cooling: string;
    appliances: string[];
    flooring: string;
    windows: string;
  };
  propertyDetails: {
    parking: string;
    lotSize: string;
    yearBuilt: number;
    construction: string;
  };
  nearbyCities: { name: string; time: string }[];
  priceHistory: { date: string; price: number; event: string }[];
  taxHistory: { year: number; tax: number; assessment: number }[];
  schools: { name: string; rating: number; distance: string }[];
}
interface User {
  email: string;
  passwordHash: string;
  name: string;
  city: string;
  phone: string;
  role: 'Buyer' | 'Renter' | 'Seller' | 'Just Browsing';
  targetCity: string;
  minPrice: string;
  maxPrice: string;
}

function AuthPage({ onSignIn, onSignUp, onClose }: {
  onSignIn: (email: string, password: string) => Promise<void>,
  onSignUp: (user: Omit<User, 'passwordHash'>, password: string) => Promise<void>,
  onClose: () => void
}) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignIn) {
        await onSignIn(email, password);
      } else {
        await onSignUp({
          email,
          name,
          city,
          phone: '',
          role: 'Just Browsing',
          targetCity: '',
          minPrice: '',
          maxPrice: ''
        }, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {isSignIn ? 'Welcome back' : 'Create an account'}
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

function ProfilePage({ user, onUpdateProfile, onSignOut }: { user: User, onUpdateProfile: (user: User) => void, onSignOut: () => void }) {
  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 h-32 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full p-1">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
                <button
                  onClick={onSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  >
                    <option>Buyer</option>
                    <option>Renter</option>
                    <option>Seller</option>
                    <option>Just Browsing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target City</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                    value={formData.targetCity}
                    onChange={(e) => setFormData({ ...formData, targetCity: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Price</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="$"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                      value={formData.minPrice}
                      onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Price</label>
                    <input
                      type="text"
                      disabled={!isEditing}
                      placeholder="$"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-900 dark:bg-gray-700 dark:text-white"
                      value={formData.maxPrice}
                      onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
const mockProperties: Property[] = [
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: 450000,
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: "https://images.unsplash.com/photo-1664892798972-079f15663b16?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    description: "Experience the pulse of the city in this stunning modern apartment located in the heart of downtown San Francisco. Floor-to-ceiling windows offer breathtaking views of the skyline, while the open-concept living area provides the perfect space for entertaining. Recently renovated with high-end finishes, this unit combines luxury with urban convenience.",
    features: ["City Views", "Open Floor Plan", "Smart Home System", "Concierge Service", "Rooftop Terrace", "Fitness Center"],
    interiorFeatures: {
      heating: "Central Forced Air",
      cooling: "Central Air",
      appliances: ["Dishwasher", "Dryer", "Freezer", "Garbage Disposal", "Microwave", "Range / Oven", "Refrigerator", "Washer"],
      flooring: "Hardwood, Tile",
      windows: "Double Pane, Floor-to-Ceiling"
    },
    propertyDetails: {
      parking: "1 Space, Assigned, Underground",
      lotSize: "N/A",
      yearBuilt: 2015,
      construction: "Concrete & Steel"
    },
    nearbyCities: [
      { name: "Oakland", time: "20 min" },
      { name: "Berkeley", time: "25 min" },
      { name: "San Jose", time: "55 min" }
    ],
    priceHistory: [
      { date: "2023-11-15", price: 450000, event: "Listed for sale" },
      { date: "2023-10-01", price: 465000, event: "Price change" },
      { date: "2019-06-20", price: 395000, event: "Sold" },
      { date: "2019-04-15", price: 400000, event: "Listed for sale" },
      { date: "2015-03-10", price: 350000, event: "Sold" }
    ],
    taxHistory: [
      { year: 2023, tax: 5200, assessment: 410000 },
      { year: 2022, tax: 5100, assessment: 400000 }
    ],
    schools: [
      { name: "Downtown High School", rating: 8, distance: "0.5 mi" },
      { name: "Market Street Elementary", rating: 7, distance: "0.3 mi" },
      { name: "Bay Area Arts Academy", rating: 9, distance: "1.2 mi" }
    ]
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 750000,
    address: "456 Oak Avenue",
    city: "Palo Alto",
    state: "CA",
    zipCode: "94301",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBMHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    description: "Welcome to this charming family home nestled in a quiet, tree-lined neighborhood of Palo Alto. This spacious residence features a large backyard perfect for kids and pets, a gourmet kitchen with granite countertops, and a cozy fireplace in the living room. With top-rated schools nearby and easy access to parks and shopping, this is the ideal place to raise a family.",
    features: ["Large Backyard", "Gourmet Kitchen", "Fireplace", "Hardwood Floors", "Patio", "Garden"],
    interiorFeatures: {
      heating: "Forced Air, Gas",
      cooling: "Central Air",
      appliances: ["Dishwasher", "Range / Oven", "Refrigerator", "Microwave"],
      flooring: "Hardwood, Carpet",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "2 Car Garage, Attached",
      lotSize: "0.25 Acres",
      yearBuilt: 1998,
      construction: "Wood Frame, Stucco"
    },
    nearbyCities: [
      { name: "Mountain View", time: "10 min" },
      { name: "Sunnyvale", time: "15 min" },
      { name: "San Jose", time: "25 min" }
    ],
    priceHistory: [
      { date: "2024-01-10", price: 750000, event: "Listed for sale" },
      { date: "2023-11-05", price: 775000, event: "Listed for sale" },
      { date: "2010-05-15", price: 550000, event: "Sold" },
      { date: "2010-02-20", price: 560000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 8500, assessment: 720000 },
      { year: 2022, tax: 8300, assessment: 700000 }
    ],
    schools: [
      { name: "Palo Alto High", rating: 10, distance: "1.2 mi" },
      { name: "Jordan Middle", rating: 9, distance: "0.8 mi" },
      { name: "Walter Hays Elementary", rating: 9, distance: "0.5 mi" }
    ]
  },
  {
    id: 3,
    title: "Luxury Waterfront Condo",
    price: 1200000,
    address: "789 Beach Road",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    type: "condo",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: "https://plus.unsplash.com/premium_photo-1736194025313-c233cf672cc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    description: "Indulge in the ultimate waterfront lifestyle in this exquisite condo overlooking the ocean. Wake up to stunning sunrises and enjoy evening cocktails on your private balcony. The building offers resort-style amenities including a pool, spa, and private beach access. Inside, you'll find marble floors, a chef's kitchen, and a master suite that feels like a 5-star hotel.",
    features: ["Ocean Views", "Private Balcony", "Pool & Spa", "Private Beach Access", "Marble Floors", "Chef's Kitchen"],
    interiorFeatures: {
      heating: "Electric, Heat Pump",
      cooling: "Central Air, Zoned",
      appliances: ["Dishwasher", "Dryer", "Freezer", "Microwave", "Range / Oven", "Refrigerator", "Washer", "Wine Cooler"],
      flooring: "Marble, Tile",
      windows: "Impact Glass, Sliding"
    },
    propertyDetails: {
      parking: "2 Spaces, Valet",
      lotSize: "N/A",
      yearBuilt: 2020,
      construction: "Concrete Block"
    },
    nearbyCities: [
      { name: "Fort Lauderdale", time: "35 min" },
      { name: "Hollywood", time: "25 min" },
      { name: "West Palm Beach", time: "60 min" }
    ],
    priceHistory: [
      { date: "2024-02-01", price: 1200000, event: "Listed for sale" },
      { date: "2023-08-15", price: 1250000, event: "Listed for sale" },
      { date: "2020-12-15", price: 950000, event: "Sold" },
      { date: "2020-01-10", price: 975000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 14000, assessment: 1100000 },
      { year: 2022, tax: 13500, assessment: 1050000 }
    ],
    schools: [
      { name: "Miami Beach High", rating: 6, distance: "2.5 mi" },
      { name: "South Pointe Elementary", rating: 8, distance: "1.0 mi" },
      { name: "Nautilus Middle School", rating: 7, distance: "1.8 mi" }
    ]
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    price: 280000,
    address: "321 Pine Street",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    imageUrl: "https://images.unsplash.com/photo-1702014862053-946a122b920d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    description: "Perfect for the urban professional, this cozy studio apartment offers efficiency and style in the heart of Seattle. Features include a Murphy bed to maximize space, a modern kitchenette, and large windows that let in plenty of natural light. Located within walking distance of coffee shops, Pike Place Market, and tech hubs.",
    features: ["Murphy Bed", "Modern Kitchenette", "Walk Score 98", "Bike Storage", "Common Roof Deck"],
    interiorFeatures: {
      heating: "Baseboard, Electric",
      cooling: "None",
      appliances: ["Range / Oven", "Refrigerator", "Microwave"],
      flooring: "Laminate",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "Street Parking",
      lotSize: "N/A",
      yearBuilt: 1925,
      construction: "Brick"
    },
    nearbyCities: [
      { name: "Bellevue", time: "20 min" },
      { name: "Tacoma", time: "45 min" },
      { name: "Everett", time: "35 min" }
    ],
    priceHistory: [
      { date: "2023-10-05", price: 280000, event: "Listed for sale" },
      { date: "2023-09-01", price: 295000, event: "Listed for sale" },
      { date: "2018-04-12", price: 210000, event: "Sold" },
      { date: "2015-11-30", price: 185000, event: "Sold" }
    ],
    taxHistory: [
      { year: 2023, tax: 2800, assessment: 260000 },
      { year: 2022, tax: 2700, assessment: 250000 }
    ],
    schools: [
      { name: "Garfield High", rating: 7, distance: "1.5 mi" },
      { name: "Lowell Elementary", rating: 6, distance: "0.8 mi" },
      { name: "Washington Middle School", rating: 8, distance: "1.1 mi" }
    ]
  },
  {
    id: 5,
    title: "Mountain View House",
    price: 890000,
    address: "654 Highland Drive",
    city: "Denver",
    state: "CO",
    zipCode: "80202",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBMHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    description: "Embrace the outdoor lifestyle in this beautiful mountain home. Featuring panoramic views of the Rockies, a wrap-around deck, and a spacious open floor plan. The living room boasts vaulted ceilings and a stone fireplace. The master suite offers a private retreat with a spa-like bathroom. Minutes from hiking trails and ski resorts.",
    features: ["Mountain Views", "Wrap-around Deck", "Vaulted Ceilings", "Stone Fireplace", "Hiking Trails Nearby"],
    interiorFeatures: {
      heating: "Forced Air, Natural Gas",
      cooling: "Central Air",
      appliances: ["Dishwasher", "Dryer", "Microwave", "Range / Oven", "Refrigerator", "Washer"],
      flooring: "Hardwood, Carpet, Stone",
      windows: "Double Pane, Low-E"
    },
    propertyDetails: {
      parking: "2 Car Garage, Attached",
      lotSize: "0.5 Acres",
      yearBuilt: 2005,
      construction: "Wood Siding, Stone"
    },
    nearbyCities: [
      { name: "Boulder", time: "35 min" },
      { name: "Colorado Springs", time: "60 min" },
      { name: "Fort Collins", time: "65 min" }
    ],
    priceHistory: [
      { date: "2024-03-01", price: 890000, event: "Listed for sale" },
      { date: "2023-12-10", price: 920000, event: "Listed for sale" },
      { date: "2016-08-20", price: 620000, event: "Sold" },
      { date: "2016-06-01", price: 635000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 6500, assessment: 850000 },
      { year: 2022, tax: 6200, assessment: 800000 }
    ],
    schools: [
      { name: "East High School", rating: 8, distance: "2.0 mi" },
      { name: "Cory Elementary", rating: 9, distance: "1.1 mi" },
      { name: "Merrill Middle School", rating: 7, distance: "1.5 mi" }
    ]
  },
  {
    id: 6,
    title: "Modern Minimalist Townhouse",
    price: 550000,
    address: "987 Market Street",
    city: "Chicago",
    state: "IL",
    zipCode: "60614",
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    imageUrl: "https://plus.unsplash.com/premium_photo-1725408025985-4e2a24c03133?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    description: "Sleek and sophisticated, this modern townhouse offers three levels of contemporary living space. The main floor features polished concrete floors and a custom kitchen with European cabinetry. The rooftop deck provides a private oasis in the city. Located in a trendy neighborhood with easy access to public transit and dining.",
    features: ["Rooftop Deck", "Polished Concrete Floors", "Custom Kitchen", "Smart Lighting", "Attached Garage"],
    interiorFeatures: {
      heating: "Forced Air, Gas",
      cooling: "Central Air",
      appliances: ["Dishwasher", "Dryer", "Microwave", "Range / Oven", "Refrigerator", "Washer"],
      flooring: "Concrete, Hardwood",
      windows: "Aluminum, Double Pane"
    },
    propertyDetails: {
      parking: "1 Car Garage, Attached",
      lotSize: "N/A",
      yearBuilt: 2018,
      construction: "Brick, Metal Siding"
    },
    nearbyCities: [
      { name: "Evanston", time: "30 min" },
      { name: "Naperville", time: "45 min" },
      { name: "Oak Park", time: "20 min" }
    ],
    priceHistory: [
      { date: "2023-12-01", price: 550000, event: "Listed for sale" },
      { date: "2023-10-15", price: 575000, event: "Listed for sale" },
      { date: "2018-11-10", price: 495000, event: "Sold" },
      { date: "2018-09-05", price: 510000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 9200, assessment: 520000 },
      { year: 2022, tax: 9000, assessment: 510000 }
    ],
    schools: [
      { name: "Lincoln Park High", rating: 7, distance: "1.0 mi" },
      { name: "Skinner North", rating: 10, distance: "2.5 mi" },
      { name: "Ogden International", rating: 8, distance: "1.5 mi" }
    ]
  },
  {
    id: 7,
    title: "Charming Boston Brownstone",
    price: 980000,
    address: "101 Beacon Street",
    city: "Boston",
    state: "MA",
    zipCode: "02116",
    type: "house",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3100,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1694475477920-8064c7783ed9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
    description: "Own a piece of history with this classic Boston Brownstone. This elegant home features high ceilings, original crown molding, and multiple fireplaces. The renovated kitchen blends modern convenience with period charm. A private courtyard offers a serene escape. Located in the prestigious Back Bay neighborhood.",
    features: ["Historic Charm", "High Ceilings", "Crown Molding", "Private Courtyard", "Multiple Fireplaces", "Library"],
    interiorFeatures: {
      heating: "Radiant, Gas",
      cooling: "Central Air (High Velocity)",
      appliances: ["Dishwasher", "Range / Oven", "Refrigerator", "Wine Cooler"],
      flooring: "Hardwood, Marble",
      windows: "Wood, Double Hung"
    },
    propertyDetails: {
      parking: "Street Permit",
      lotSize: "0.05 Acres",
      yearBuilt: 1890,
      construction: "Brownstone, Brick"
    },
    nearbyCities: [
      { name: "Cambridge", time: "15 min" },
      { name: "Somerville", time: "20 min" },
      { name: "Brookline", time: "15 min" }
    ],
    priceHistory: [
      { date: "2024-01-20", price: 980000, event: "Listed for sale" },
      { date: "2023-11-10", price: 1050000, event: "Listed for sale" },
      { date: "1995-06-30", price: 350000, event: "Sold" },
      { date: "1995-03-15", price: 375000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 11000, assessment: 950000 },
      { year: 2022, tax: 10500, assessment: 900000 }
    ],
    schools: [
      { name: "Boston Latin", rating: 10, distance: "1.8 mi" },
      { name: "Eliot K-8", rating: 8, distance: "1.2 mi" },
      { name: "Snowden International", rating: 7, distance: "0.8 mi" }
    ]
  },
  {
    id: 8,
    title: "Historic Victorian Mansion",
    price: 1850000,
    address: "240 Grand Avenue",
    city: "Savannah",
    state: "GA",
    zipCode: "31401",
    type: "house",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1698852880899-60633378ff6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false,
    description: "Step back in time with this breathtaking Victorian mansion. Known for its intricate gingerbread trim and wrap-around porch, this home is a true architectural masterpiece. Inside, you'll find a grand staircase, stained glass windows, and spacious parlors. The lush gardens are perfect for afternoon tea. A rare opportunity to own a landmark property.",
    features: ["Wrap-around Porch", "Stained Glass", "Grand Staircase", "Lush Gardens", "Guest House", "Original Woodwork"],
    interiorFeatures: {
      heating: "Radiator, Gas",
      cooling: "Central Air",
      appliances: ["Dishwasher", "Range / Oven", "Refrigerator", "Washer", "Dryer"],
      flooring: "Original Hardwood, Tile",
      windows: "Original Wood, Stained Glass"
    },
    propertyDetails: {
      parking: "Carriage House (2 Cars)",
      lotSize: "0.75 Acres",
      yearBuilt: 1885,
      construction: "Wood Siding"
    },
    nearbyCities: [
      { name: "Charleston", time: "2 hr" },
      { name: "Jacksonville", time: "2 hr" },
      { name: "Atlanta", time: "3.5 hr" }
    ],
    priceHistory: [
      { date: "2023-09-15", price: 1850000, event: "Listed for sale" },
      { date: "2023-06-01", price: 1950000, event: "Listed for sale" },
      { date: "2015-02-28", price: 1200000, event: "Sold" },
      { date: "2014-10-10", price: 1250000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 16000, assessment: 1700000 },
      { year: 2022, tax: 15500, assessment: 1650000 }
    ],
    schools: [
      { name: "Savannah Arts Academy", rating: 9, distance: "1.5 mi" },
      { name: "Garrison School", rating: 8, distance: "0.5 mi" },
      { name: "Esther F. Garrison", rating: 8, distance: "0.6 mi" }
    ]
  },
  {
    id: 9,
    title: "Stunning Beachfront Villa",
    price: 3200000,
    address: "55 Pacific Coast Highway",
    city: "Malibu",
    state: "CA",
    zipCode: "90265",
    type: "house",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 5200,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true,
    description: "Experience the pinnacle of luxury living in this stunning beachfront villa. Designed by a world-renowned architect, this home features seamless indoor-outdoor living with walls of glass opening to the Pacific Ocean. Amenities include an infinity pool, home theater, wine cellar, and a private path to the sand. The ultimate coastal retreat.",
    features: ["Direct Beach Access", "Infinity Pool", "Home Theater", "Wine Cellar", "Smart Home", "Gated Entry"],
    interiorFeatures: {
      heating: "Radiant Floor, Forced Air",
      cooling: "Central Air, Zoned",
      appliances: ["Sub-Zero Fridge", "Wolf Range", "Double Dishwasher", "Wine Cooler", "Espresso Machine"],
      flooring: "Limestone, Hardwood",
      windows: "Floor-to-Ceiling, Impact"
    },
    propertyDetails: {
      parking: "3 Car Garage, Gated",
      lotSize: "1.2 Acres",
      yearBuilt: 2022,
      construction: "Concrete, Steel, Glass"
    },
    nearbyCities: [
      { name: "Santa Monica", time: "20 min" },
      { name: "Los Angeles", time: "45 min" },
      { name: "Santa Barbara", time: "60 min" }
    ],
    priceHistory: [
      { date: "2024-04-01", price: 3200000, event: "Listed for sale" },
      { date: "2023-11-15", price: 3400000, event: "Listed for sale" },
      { date: "2021-01-15", price: 2800000, event: "Sold" },
      { date: "2020-08-20", price: 2950000, event: "Listed for sale" }
    ],
    taxHistory: [
      { year: 2023, tax: 35000, assessment: 3000000 },
      { year: 2022, tax: 34000, assessment: 2900000 }
    ],
    schools: [
      { name: "Malibu High", rating: 9, distance: "3.0 mi" },
      { name: "Webster Elementary", rating: 9, distance: "1.5 mi" },
      { name: "Pepperdine University", rating: 8, distance: "2.0 mi" }
    ]
  }
];

const mockRentProperties: Property[] = [
  {
    id: 101,
    title: "Modern Downtown Loft",
    price: 3500,
    address: "456 Market St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1080&auto=format&fit=crop",
    featured: true,
    description: "Stylish loft in the heart of the city. Features high ceilings, exposed brick, and large windows. Walking distance to top restaurants and nightlife.",
    features: ["Exposed Brick", "High Ceilings", "City Views", "In-unit Laundry", "Pet Friendly"],
    interiorFeatures: {
      heating: "Electric Baseboard",
      cooling: "Portable AC",
      appliances: ["Refrigerator", "Stove", "Dishwasher", "Washer", "Dryer"],
      flooring: "Concrete",
      windows: "Large Industrial"
    },
    propertyDetails: {
      parking: "Street Parking",
      lotSize: "N/A",
      yearBuilt: 1920,
      construction: "Brick"
    },
    nearbyCities: [
      { name: "Oakland", time: "20 min" },
      { name: "Berkeley", time: "30 min" }
    ],
    priceHistory: [
      { date: "2024-01-15", price: 3500, event: "Listed for rent" },
      { date: "2022-05-01", price: 3200, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Downtown High", rating: 7, distance: "0.5 mi" },
      { name: "Market Elementary", rating: 6, distance: "0.2 mi" },
      { name: "City Middle", rating: 7, distance: "0.8 mi" }
    ]
  },
  {
    id: 102,
    title: "Spacious Family Home",
    price: 5500,
    address: "1428 Maple Ave",
    city: "Palo Alto",
    state: "CA",
    zipCode: "94306",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    description: "Beautiful family home with a large backyard. Located in a quiet neighborhood with excellent schools. Recently updated kitchen and bathrooms.",
    features: ["Large Backyard", "Updated Kitchen", "Garage", "Fireplace", "Gardener Included"],
    interiorFeatures: {
      heating: "Central Forced Air",
      cooling: "Central Air",
      appliances: ["Refrigerator", "Oven", "Microwave", "Dishwasher"],
      flooring: "Hardwood",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "2 Car Garage",
      lotSize: "0.2 Acres",
      yearBuilt: 1975,
      construction: "Wood Frame"
    },
    nearbyCities: [
      { name: "Mountain View", time: "10 min" },
      { name: "Menlo Park", time: "15 min" }
    ],
    priceHistory: [
      { date: "2024-02-01", price: 5500, event: "Listed for rent" },
      { date: "2021-08-15", price: 5000, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Palo Alto High", rating: 10, distance: "1.0 mi" },
      { name: "Jordan Middle", rating: 9, distance: "0.7 mi" },
      { name: "Walter Hays", rating: 9, distance: "0.4 mi" }
    ]
  },
  {
    id: 103,
    title: "Luxury High-Rise Condo",
    price: 8000,
    address: "4501 Ocean Dr",
    city: "Miami",
    state: "FL",
    zipCode: "33140",
    type: "condo",
    bedrooms: 2,
    bathrooms: 2.5,
    sqft: 1500,
    imageUrl: "https://images.unsplash.com/photo-1741764014072-68953e93cd48?q=80&w=1219&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    description: "Experience luxury living with panoramic ocean views. Building amenities include a pool, gym, spa, and 24-hour concierge. Unit features high-end finishes and a private balcony.",
    features: ["Ocean Views", "Pool", "Gym", "Concierge", "Balcony", "Valet Parking"],
    interiorFeatures: {
      heating: "Central Electric",
      cooling: "Central Air",
      appliances: ["Sub-Zero Fridge", "Wolf Range", "Wine Cooler", "Washer", "Dryer"],
      flooring: "Marble",
      windows: "Floor-to-Ceiling"
    },
    propertyDetails: {
      parking: "Valet",
      lotSize: "N/A",
      yearBuilt: 2018,
      construction: "Concrete"
    },
    nearbyCities: [
      { name: "South Beach", time: "5 min" },
      { name: "Downtown Miami", time: "15 min" }
    ],
    priceHistory: [
      { date: "2024-03-10", price: 8000, event: "Listed for rent" },
      { date: "2023-01-20", price: 7500, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Miami Beach High", rating: 6, distance: "2.0 mi" },
      { name: "South Pointe", rating: 8, distance: "1.5 mi" },
      { name: "Nautilus Middle", rating: 7, distance: "1.8 mi" }
    ]
  },
  {
    id: 104,
    title: "Cozy Garden Cottage",
    price: 2200,
    address: "2845 Rose Ln",
    city: "Portland",
    state: "OR",
    zipCode: "97202",
    type: "house",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    imageUrl: "https://images.unsplash.com/photo-1761384753946-cb27bb4a6dec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    description: "Charming detached cottage in a lush garden setting. Private entrance and patio. Perfect for a single professional or couple. Utilities included.",
    features: ["Garden Setting", "Private Patio", "Utilities Included", "Quiet Neighborhood", "Pet Friendly"],
    interiorFeatures: {
      heating: "Gas Wall Heater",
      cooling: "Window AC",
      appliances: ["Stove", "Refrigerator", "Microwave"],
      flooring: "Hardwood",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "Street Parking",
      lotSize: "Shared",
      yearBuilt: 1940,
      construction: "Wood Siding"
    },
    nearbyCities: [
      { name: "Beaverton", time: "20 min" },
      { name: "Vancouver", time: "25 min" }
    ],
    priceHistory: [
      { date: "2024-02-28", price: 2200, event: "Listed for rent" },
      { date: "2022-09-01", price: 2000, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Cleveland High", rating: 8, distance: "1.2 mi" },
      { name: "Grout Elementary", rating: 7, distance: "0.5 mi" },
      { name: "Hosford Middle", rating: 8, distance: "0.9 mi" }
    ]
  },
  {
    id: 105,
    title: "Modern Tech Hub Apartment",
    price: 3800,
    address: "1200 Tech Way",
    city: "Seattle",
    state: "WA",
    zipCode: "98109",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    description: "Located in the heart of South Lake Union. Walking distance to major tech campuses. Building features a rooftop deck, gym, and co-working space.",
    features: ["Tech Hub Location", "Rooftop Deck", "Co-working Space", "Gym", "Pet Spa"],
    interiorFeatures: {
      heating: "Electric",
      cooling: "Port AC",
      appliances: ["Stainless Steel Appliances", "Washer", "Dryer"],
      flooring: "Laminate",
      windows: "Large"
    },
    propertyDetails: {
      parking: "Garage ($200/mo)",
      lotSize: "N/A",
      yearBuilt: 2019,
      construction: "Mixed Use"
    },
    nearbyCities: [
      { name: "Bellevue", time: "25 min" },
      { name: "Redmond", time: "35 min" }
    ],
    priceHistory: [
      { date: "2024-01-05", price: 3800, event: "Listed for rent" },
      { date: "2023-02-15", price: 3600, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Ballard High", rating: 9, distance: "3.0 mi" },
      { name: "Lowell Elementary", rating: 6, distance: "1.0 mi" },
      { name: "Washington Middle", rating: 8, distance: "2.0 mi" }
    ]
  },
  {
    id: 106,
    title: "Historic Brownstone Floor",
    price: 4200,
    address: "182 Beacon St",
    city: "Boston",
    state: "MA",
    zipCode: "02116",
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 1000,
    imageUrl: "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=1170&auto=format&fit=crop",
    featured: true,
    description: "Elegant floor-through apartment in a classic Back Bay brownstone. Features high ceilings, decorative fireplace, and bay windows. Close to the Public Garden and Charles River.",
    features: ["Historic Charm", "Bay Windows", "Decorative Fireplace", "High Ceilings", "River Views"],
    interiorFeatures: {
      heating: "Radiator",
      cooling: "Window Units",
      appliances: ["Stove", "Fridge", "Dishwasher"],
      flooring: "Hardwood",
      windows: "Bay Windows"
    },
    propertyDetails: {
      parking: "Street Permit",
      lotSize: "N/A",
      yearBuilt: 1890,
      construction: "Brownstone"
    },
    nearbyCities: [
      { name: "Cambridge", time: "10 min" },
      { name: "Brookline", time: "15 min" }
    ],
    priceHistory: [
      { date: "2024-03-01", price: 4200, event: "Listed for rent" },
      { date: "2022-06-01", price: 3900, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Boston Latin", rating: 10, distance: "1.5 mi" },
      { name: "Snowden", rating: 7, distance: "0.5 mi" },
      { name: "Eliot K-8", rating: 8, distance: "1.0 mi" }
    ]
  },
  {
    id: 107,
    title: "Artist Loft in Arts District",
    price: 2800,
    address: "942 Artsy Way",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90013",
    type: "apartment",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 900,
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    description: "Open plan artist loft with concrete floors and high ceilings. Great natural light. Building has a rooftop pool and gallery space.",
    features: ["Open Plan", "Concrete Floors", "Rooftop Pool", "Gallery Space", "Freight Elevator"],
    interiorFeatures: {
      heating: "Central",
      cooling: "Central",
      appliances: ["Stove", "Fridge", "Dishwasher"],
      flooring: "Concrete",
      windows: "Large Industrial"
    },
    propertyDetails: {
      parking: "1 Gated Spot",
      lotSize: "N/A",
      yearBuilt: 1925,
      construction: "Concrete"
    },
    nearbyCities: [
      { name: "Pasadena", time: "20 min" },
      { name: "Santa Monica", time: "30 min" }
    ],
    priceHistory: [
      { date: "2024-01-20", price: 2800, event: "Listed for rent" },
      { date: "2023-03-15", price: 2600, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "LA High for Arts", rating: 9, distance: "2.0 mi" },
      { name: "Metro Charter", rating: 7, distance: "0.5 mi" },
      { name: "Para Los Ninos", rating: 6, distance: "0.8 mi" }
    ]
  },
  {
    id: 108,
    title: "Suburban Townhouse",
    price: 3200,
    address: "1562 Oak Ln",
    city: "Naperville",
    state: "IL",
    zipCode: "60540",
    type: "condo",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1600,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1170&auto=format&fit=crop",
    featured: false,
    description: "Spacious townhouse in a family-friendly community. Features a finished basement, attached garage, and community pool. Close to parks and shopping.",
    features: ["Finished Basement", "Attached Garage", "Community Pool", "Patio", "In-unit Laundry"],
    interiorFeatures: {
      heating: "Forced Air",
      cooling: "Central Air",
      appliances: ["Stove", "Fridge", "Dishwasher", "Washer", "Dryer"],
      flooring: "Carpet, Tile",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "2 Car Garage",
      lotSize: "N/A",
      yearBuilt: 2005,
      construction: "Wood Frame"
    },
    nearbyCities: [
      { name: "Chicago", time: "45 min" },
      { name: "Aurora", time: "15 min" }
    ],
    priceHistory: [
      { date: "2024-02-10", price: 3200, event: "Listed for rent" },
      { date: "2021-07-01", price: 2900, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "Naperville North", rating: 10, distance: "1.5 mi" },
      { name: "Washington Jr High", rating: 9, distance: "1.0 mi" },
      { name: "Naper Elem", rating: 9, distance: "0.5 mi" }
    ]
  },
  {
    id: 109,
    title: "Lakefront Cabin",
    price: 2500,
    address: "5400 Lakeview Dr",
    city: "Tahoe City",
    state: "CA",
    zipCode: "96150",
    type: "house",
    bedrooms: 2,
    bathrooms: 1,
    sqft: 900,
    imageUrl: "https://images.unsplash.com/photo-1763051339093-61c59f40ba28?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    description: "Cozy cabin with stunning lake views. Large deck for outdoor dining. Wood burning stove. Perfect for a weekend getaway or year-round living.",
    features: ["Lake Views", "Large Deck", "Wood Stove", "Hiking Trails", "Beach Access"],
    interiorFeatures: {
      heating: "Wood Stove, Electric",
      cooling: "None",
      appliances: ["Stove", "Fridge", "Microwave"],
      flooring: "Wood",
      windows: "Double Pane"
    },
    propertyDetails: {
      parking: "Driveway",
      lotSize: "0.3 Acres",
      yearBuilt: 1960,
      construction: "Log Cabin"
    },
    nearbyCities: [
      { name: "Truckee", time: "20 min" },
      { name: "Reno", time: "45 min" }
    ],
    priceHistory: [
      { date: "2024-01-01", price: 2500, event: "Listed for rent" },
      { date: "2022-11-15", price: 2300, event: "Rented" }
    ],
    taxHistory: [],
    schools: [
      { name: "North Tahoe High", rating: 8, distance: "2.0 mi" },
      { name: "North Tahoe Middle", rating: 7, distance: "2.0 mi" },
      { name: "Tahoe Lake Elem", rating: 8, distance: "1.0 mi" }
    ]
  }
];

function PropertyDetails({ property, onClose, isFavorite, onToggleFavorite, formatPrice, listingType }: {
  property: Property;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (price: number) => string;
  listingType: 'buy' | 'rent' | 'mortgage';
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Hero Image */}
          <div className="relative h-72 md:h-96">
            <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-3xl font-bold text-white mb-2">{property.title}</h2>
              <div className="flex items-center gap-4 text-white/90">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {property.address}, {property.city}, {property.state}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            {/* Key Stats */}
            <div className="flex flex-wrap gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.bedrooms}</p>
                </div>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-3">
                <Bath className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.bathrooms}</p>
                </div>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-3">
                <Square className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Square Feet</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.sqft}</p>
                </div>
              </div>
              <div className="w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Year Built</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{property.propertyDetails.yearBuilt}</p>
                </div>
              </div>
            </div>

            {/* What's Special */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Special</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                    {feature}
                  </span>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About this home</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {property.description}
              </p>
            </section>

            {/* Facts & Features */}
            <section className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" /> Interior Details
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Heating</span> <span className="font-medium text-gray-900 dark:text-white">{property.interiorFeatures.heating}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Cooling</span> <span className="font-medium text-gray-900 dark:text-white">{property.interiorFeatures.cooling}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Flooring</span> <span className="font-medium text-gray-900 dark:text-white">{property.interiorFeatures.flooring}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Windows</span> <span className="font-medium text-gray-900 dark:text-white">{property.interiorFeatures.windows}</span>
                  </li>
                  <li className="pt-2">
                    <span className="block mb-2 font-medium text-gray-900 dark:text-white">Appliances</span>
                    <div className="flex flex-wrap gap-2">
                      {property.interiorFeatures.appliances.map((appliance, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600">
                          {appliance}
                        </span>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Hammer className="w-5 h-5" /> Property Details
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Parking</span> <span className="font-medium text-gray-900 dark:text-white">{property.propertyDetails.parking}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Lot Size</span> <span className="font-medium text-gray-900 dark:text-white">{property.propertyDetails.lotSize}</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                    <span>Construction</span> <span className="font-medium text-gray-900 dark:text-white">{property.propertyDetails.construction}</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* History */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" /> Price History
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Event</th>
                      <th className="pb-2 font-medium">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-300">
                    {property.priceHistory.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                        <td className="py-3">{item.date}</td>
                        <td className="py-3">{item.event}</td>
                        <td className="py-3 font-medium text-gray-900 dark:text-white">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Schools */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <School className="w-5 h-5" /> Nearby Schools
              </h3>
              <div className="space-y-3">
                {property.schools.map((school, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{school.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{school.distance}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${school.rating >= 8 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {school.rating}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar / Bottom Bar */}
        <div className="w-full md:w-80 bg-white dark:bg-gray-800 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700 p-6 flex flex-col shrink-0">
          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(property.price)}
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/30">
              Request a Tour
            </button>
            <button className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors">
              Contact Agent
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-4">Nearby Cities</h4>
            <ul className="space-y-2">
              {property.nearbyCities.map((city, idx) => (
                <li key={idx} className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{city.name}</span>
                  <span className="text-gray-400">{city.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PropertyCard({ property, isFavorite, onToggleFavorite, formatPrice, onClick }: {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (price: number) => string;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="group relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(property.id); }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite
            ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
            : 'bg-black/20 text-white hover:bg-black/40'
            }`}
        >
          <Heart fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} className="w-5 h-5" />
        </button>
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-black/60 backdrop-blur-sm text-gray-900 dark:text-white uppercase tracking-wider">
            {property.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-medium text-gray-900 dark:text-white truncate flex-1 pr-2" title={property.title}>
            {property.title}
          </h4>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(property.price)}
          </p>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {property.address}, {property.city}, {property.state}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms === 0 ? 'Studio' : <>{property.bedrooms} <span className="hidden sm:inline">Beds</span></>}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} <span className="hidden sm:inline">Baths</span></span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
            <Square className="w-4 h-4" />
            <span>{property.sqft} <span className="hidden sm:inline">sqft</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MortgagePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const rates = [
    {
      title: "30-Year Fixed",
      tag: "Most popular",
      tagColor: "bg-green-100 text-green-800",
      rate: "6.125%",
      apr: "6.263%",
      points: "1.448 ($3,982.00)",
      features: ["3% min down payment", "Lower payments due to longer term"]
    },
    {
      title: "30-Year FHA",
      tag: "Lower credit profiles",
      tagColor: "bg-green-100 text-green-800",
      rate: "5.875%",
      apr: "6.546%",
      points: "1.577 ($4,336.75)",
      features: ["3.5% min down payment", "Looser credit/debt requirements"]
    },
    {
      title: "30-Year VA",
      tag: "Eligible military",
      tagColor: "bg-green-100 text-green-800",
      rate: "6.000%",
      apr: "6.299%",
      points: "1.889 ($5,194.75)",
      features: ["0% down payment", "No private mortgage insurance"]
    },
    {
      title: "20-Year Fixed",
      tag: "Save on interest",
      tagColor: "bg-green-100 text-green-800",
      rate: "6.125%",
      apr: "6.367%",
      points: "1.912 ($5,258.00)",
      features: ["5% min down payment", "Pay less interest due to shorter term"]
    },
    {
      title: "15-Year Fixed",
      tag: "Faster payoff",
      tagColor: "bg-green-100 text-green-800",
      rate: "5.375%",
      apr: "5.682%",
      points: "1.975 ($5,431.25)",
      features: ["5% min down payment", "Pay less interest due to shorter term"]
    }
  ];

  const faqs = [
    {
      question: "What is HomeNest Home Loans?",
      answer: "HomeNest Home Loans is a mortgage lender dedicated to helping you move from dreaming to financing with a variety of mortgage options, step-by-step guidance from top-rated loan officers and rich affordability tools integrated into the HomeNest experience."
    },
    {
      question: "How do I purchase a home with HomeNest Home Loans?",
      answer: "You can start by getting pre-approved online in as little as 3 minutes. Once pre-approved, you'll be matched with a loan officer who will guide you through the home buying process."
    },
    {
      question: "How does HomeNest protect my information?",
      answer: "We use bank-level encryption and security measures to protect your personal and financial information."
    },
    {
      question: "How can I get in contact with a person from HomeNest Home Loans?",
      answer: "You can call us at 1-800-HOMENEST or schedule a call with a loan officer through your dashboard."
    }
  ];

  const testimonials = [
    {
      type: 'quote',
      color: 'bg-purple-700',
      quote: "As a first time home buyer, my HomeNest Home Loans loan officer made me feel at ease and welcomed all questions I had with so much patience.",
      author: "Michelle | Arizona",
      iconColor: "text-purple-500/30",
      textColor: "text-purple-200"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=987&auto=format&fit=crop",
      alt: "Happy homeowner"
    },
    {
      type: 'quote',
      color: 'bg-teal-700',
      quote: "My HomeNest Home Loans loan officer was incredibly professional, knowledgeable, and genuinely committed to helping me find the best financial solution.",
      author: "Ruslan | New Jersey",
      iconColor: "text-teal-500/30",
      textColor: "text-teal-200"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop",
      alt: "Happy couple"
    },
    {
      type: 'quote',
      color: 'bg-blue-700',
      quote: "The process was smooth and transparent. I felt supported every step of the way.",
      author: "Sarah | California",
      iconColor: "text-blue-500/30",
      textColor: "text-blue-200"
    },
    {
      type: 'image',
      src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop",
      alt: "Happy homeowner"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % (testimonials.length - 2));
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + (testimonials.length - 2)) % (testimonials.length - 2));
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Get a mortgage from <span className="text-blue-600">HomeNest Home Loans</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We provide mortgage options with competitive rates, no hidden fees and guidance at every step. See what you can afford to borrow with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Get pre-approved
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already working with us? <a href="/" className="text-blue-600 hover:underline font-medium">Access your dashboard</a>
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop"
              alt="Happy couple"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Why choose HomeNest Home Loans?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Competitive rates</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Strong mortgage rates, no hidden fees, and total transparency to keep you informed and up to date.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HandCoins className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Low down payment options</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We offer a variety of loan options to meet your needs and help make home ownership more affordable.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top-rated loan officers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                With a 4.9-star average rating, our loan officers provide step-by-step guidance and expertise in first-time home buying.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Find the right mortgage with HomeNest Home Loans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rates.map((rate, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{rate.title}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${rate.tagColor}`}>{rate.tag}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Rate</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{rate.rate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">APR</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{rate.apr}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Points (cost)</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{rate.points}</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {rate.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors">
                Get pre-approved
              </button>
              <p className="text-center text-xs text-blue-600 dark:text-blue-400 mt-3 cursor-pointer hover:underline">
                See sample loan terms
              </p>
            </div>
          ))}

          {/* Personalized Rate Callout */}
          <div className="bg-blue-600 rounded-xl overflow-hidden text-white flex flex-col">
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop"
                alt="Music jam"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">Get a personalized rate</h3>
                <p className="text-blue-100 mb-6">
                  Mortgage rates aren't one size fits all. We can give you an estimate based on your unique details.
                </p>
              </div>
              <button className="w-full py-3 px-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Get your personalized rate
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-12 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <button
                  className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="text-lg font-medium text-gray-900 dark:text-white pr-8">{faq.question}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 dark:text-gray-300 pb-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Buyers like you</h2>
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">HomeNest Home Loans</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Here's how happy homeowners made home a reality with our loan officers.
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentTestimonialIndex * 33.33}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((item, idx) => (
                <div key={idx} className="min-w-[calc(100%-2rem)] md:min-w-[calc(33.333%-1.33rem)] h-80">
                  {item.type === 'quote' ? (
                    <div className={`${item.color} rounded-2xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-between`}>
                      <div className={`absolute top-4 left-4 ${item.iconColor}`}>
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                        </svg>
                      </div>
                      <p className="text-xl font-bold relative z-10 mb-6 leading-relaxed">
                        "{item.quote}"
                      </p>
                      <p className={`text-sm font-medium ${item.textColor} relative z-10`}>{item.author}</p>
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden h-full">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateListings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [listingType, setListingType] = useState<'buy' | 'rent' | 'mortgage'>('buy');

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [view, setView] = useState<'home' | 'signin' | 'signup' | 'profile'>('home');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Navbar hide on scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          // Scrolling down
          setShowNavbar(false);
        } else {
          // Scrolling up
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('zillow_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredProperties = useMemo(() => {
    let propertiesToFilter = listingType === 'rent' ? mockRentProperties : mockProperties;

    return propertiesToFilter.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.zipCode.includes(searchTerm);
      const matchesType = selectedType === 'all' || property.type === selectedType;

      let matchesPrice = true;
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          matchesPrice = property.price >= min && property.price <= max;
        } else {
          matchesPrice = property.price >= min;
        }
      }

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedType, priceRange, listingType]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price) + (listingType === 'rent' ? '/mo' : '');
  };

  // Auth Logic
  const hashPassword = async (password: string) => {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSignUp = async (newUser: Omit<User, 'passwordHash'>, password: string) => {
    if (users.some(u => u.email === newUser.email)) {
      throw new Error('User already exists');
    }
    const passwordHash = await hashPassword(password);
    const userWithHash = { ...newUser, passwordHash };
    const updatedUsers = [...users, userWithHash];
    setUsers(updatedUsers);
    localStorage.setItem('zillow_users', JSON.stringify(updatedUsers));
    setUser(userWithHash);
    setView('home');
  };

  const handleSignIn = async (email: string, password: string) => {
    const passwordHash = await hashPassword(password);
    const foundUser = users.find(u => u.email === email && u.passwordHash === passwordHash);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    setUser(foundUser);
    setView('home');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('zillow_users', JSON.stringify(updatedUsers));
    setUser(updatedUser);
  };

  const handleSignOut = () => {
    setUser(null);
    setView('home');
  };

  if (view === 'signin' || view === 'signup') {
    return <AuthPage onSignIn={handleSignIn} onSignUp={handleSignUp} onClose={() => setView('home')} />;
  }

  if (view === 'profile' && user) {
    return (
      <>
        <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  HomeNest
                </span>
              </div>
              <button onClick={() => setView('home')} className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
        <ProfilePage user={user} onUpdateProfile={handleUpdateProfile} onSignOut={handleSignOut} />
      </>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-black transition-colors duration-200 ${theme} p-1.5 md:p-2`}>
      <div className="min-h-[calc(100vh-0.75rem)] md:min-h-[calc(100vh-1rem)] bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl relative">
        {/* Navigation */}
        <nav className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-50 border border-white/30 dark:border-gray-700/30 rounded-full shadow-lg transition-all duration-300 ${showNavbar ? 'top-2' : '-top-20'
          }`}>
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setListingType('buy'); setView('home'); }}>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  HomeNest
                </span>
              </div>

              {/* Center Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                <button
                  onClick={() => setListingType('buy')}
                  className={`text-sm font-medium transition-colors ${listingType === 'buy'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setListingType('rent')}
                  className={`text-sm font-medium transition-colors ${listingType === 'rent'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Rent
                </button>
                <button
                  onClick={() => setListingType('mortgage')}
                  className={`text-sm font-medium transition-colors ${listingType === 'mortgage'
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Mortgage
                </button>
                <button
                  onClick={() => user ? setView('profile') : setView('signin')}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {user ? user.name : 'Sign in'}
                </button>
              </div>

              {/* Right Side - Theme Toggle */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {listingType === 'mortgage' ? (
          <MortgagePage />
        ) : (
          <>
            {/* Hero Section */}
            <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Beautiful Modern Home"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 w-full max-w-4xl px-4 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                >
                  Find your place<br />
                  <span className="text-blue-400">to call home.</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl max-w-2xl mx-auto"
                >
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                      <input
                        type="text"
                        placeholder="Address, City, Zip, or Neighborhood"
                        className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/20 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/30">
                      Search
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedType === 'all'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    All Properties
                  </button>
                  <button
                    onClick={() => setSelectedType('house')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedType === 'house'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    Houses
                  </button>
                  <button
                    onClick={() => setSelectedType('apartment')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedType === 'apartment'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    Apartments
                  </button>
                  <button
                    onClick={() => setSelectedType('condo')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedType === 'condo'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                      }`}
                  >
                    Condos
                  </button>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="relative group">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 transition-colors"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="w-4 h-4" />
                      <span>Price Range</span>
                    </button>

                    {showFilters && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 py-2">
                        <button onClick={() => setPriceRange('all')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white">Any Price</button>
                        <button onClick={() => setPriceRange('0-500000')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white">Under $500k</button>
                        <button onClick={() => setPriceRange('500000-1000000')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white">$500k - $1M</button>
                        <button onClick={() => setPriceRange('1000000-')} className="block w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white">$1M+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      isFavorite={favorites.includes(property.id)}
                      onToggleFavorite={toggleFavorite}
                      formatPrice={formatPrice}
                      onClick={() => setSelectedProperty(property)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </main>
          </>
        )}

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Home className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    HomeNest
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Reimagining how you find your place in the world.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Real Estate</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li><a href="/" className="hover:text-blue-600">Browse Homes</a></li>
                  <li><a href="/" className="hover:text-blue-600">Sell Your Home</a></li>
                  <li><a href="/" className="hover:text-blue-600">Rentals</a></li>
                  <li><a href="/" className="hover:text-blue-600">Mortgage Rates</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li><a href="/" className="hover:text-blue-600">About Us</a></li>
                  <li><a href="/" className="hover:text-blue-600">Careers</a></li>
                  <li><a href="/" className="hover:text-blue-600">Press</a></li>
                  <li><a href="/" className="hover:text-blue-600">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li><a href="/" className="hover:text-blue-600">Blog</a></li>
                  <li><a href="/" className="hover:text-blue-600">Guides</a></li>
                  <li><a href="/" className="hover:text-blue-600">Help Center</a></li>
                  <li><a href="/" className="hover:text-blue-600">Privacy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 HomeNest Real Estate. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* Property Details Modal */}
        <AnimatePresence>
          {selectedProperty && (
            <PropertyDetails
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
              isFavorite={favorites.includes(selectedProperty.id)}
              onToggleFavorite={toggleFavorite}
              formatPrice={formatPrice}
              listingType={listingType}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


