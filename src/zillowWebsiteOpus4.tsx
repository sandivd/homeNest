// --- START OF FILE zillowWebsiteOpus4.tsx ---

import PropertyImage from './components/property-image';
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Bed, Bath, Square, MapPin, Heart, Filter, Home, Moon, Sun, X, Calendar, DollarSign, School, Hammer, ChevronRight, TrendingUp, HandCoins, UserCheck, ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Property, mockProperties, mockRentProperties } from './data/properties';

export interface User {
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

export { default as AuthPage } from './components/auth-page';

export function ProfilePage({ user, onUpdateProfile, onSignOut }: { user: User, onUpdateProfile: (user: User) => void, onSignOut: () => void }) {
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
            <PropertyImage src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
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
                  <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-left">{school.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 text-left">{school.distance}</p>
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
        <PropertyImage
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

export function MortgagePage() {
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
            <PropertyImage
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
              <PropertyImage
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
                      <p className="text-gray-600 dark:text-gray-300 pb-4 leading-relaxed text-left">
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
                      <PropertyImage
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

export function NavBar({ user, theme, toggleTheme }: { user: User | null, theme: string, toggleTheme: () => void }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShowNavbar(false);
        } else {
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

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md z-50 border border-white/30 dark:border-gray-700/30 rounded-full shadow-lg transition-all duration-300 ${showNavbar ? 'top-2' : '-top-20'}`}>
      <div className="px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HomeNest
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/buy"
              className={`text-sm font-medium transition-colors ${isActive('/buy')
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Buy
            </Link>
            <Link
              to="/rent"
              className={`text-sm font-medium transition-colors ${isActive('/rent')
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Rent
            </Link>
            <Link
              to="/mortgage"
              className={`text-sm font-medium transition-colors ${isActive('/mortgage')
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
            >
              Mortgage
            </Link>
            <Link
              to={user ? "/profile" : "/signin"}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {user ? user.name : 'Sign in'}
            </Link>
          </div>

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
  );
}

export default function RealEstateListings({ listingType }: { listingType: 'buy' | 'rent' | 'mortgage' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black transition-colors duration-200 p-1.5 md:p-2">
      <div className="min-h-[calc(100vh-0.75rem)] md:min-h-[calc(100vh-1rem)] bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl relative">

        <>
          {/* Hero Section */}
          <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <PropertyImage
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
              <p>&copy; {new Date().getFullYear()} HomeNest Real Estate. All rights reserved.</p>
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


