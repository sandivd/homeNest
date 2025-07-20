// --- START OF FILE zillowWebsiteOpus4.tsx ---

import React, { useState, useMemo, useEffect } from 'react'; // MODIFIED: Added useEffect
import { Search, Bed, Bath, Square, MapPin, Heart, Filter, Home, Moon, Sun } from 'lucide-react'; // MODIFIED: Added Moon and Sun icons

// ... (The Property interface and mockProperties array remain unchanged)
interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  type: 'house' | 'apartment' | 'condo';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  featured: boolean;
}

const mockProperties: Property[] = [
  // ... (your mock properties data here, no changes needed)
  {
    id: 1,
    title: "Modern Downtown Apartment",
    price: 450000,
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: "https://images.unsplash.com/photo-1664892798972-079f15663b16?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: 2,
    title: "Suburban Family Home",
    price: 750000,
    address: "456 Oak Avenue",
    city: "Palo Alto",
    state: "CA",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true
  },
  {
    id: 3,
    title: "Luxury Waterfront Condo",
    price: 1200000,
    address: "789 Beach Road",
    city: "Miami",
    state: "FL",
    type: "condo",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl: "https://plus.unsplash.com/premium_photo-1736194025313-c233cf672cc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: 4,
    title: "Cozy Studio Apartment",
    price: 280000,
    address: "321 Pine Street",
    city: "Seattle",
    state: "WA",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    imageUrl: "https://images.unsplash.com/photo-1702014862053-946a122b920d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: 5,
    title: "Mountain View House",
    price: 890000,
    address: "654 Highland Drive",
    city: "Denver",
    state: "CO",
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: true
  },
  {
    id: 6,
    title: "Modern Minimalist Townhouse",
    price: 550000,
    address: "987 Market Street",
    city: "Chicago",
    state: "IL",
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    imageUrl: "https://plus.unsplash.com/premium_photo-1725408025985-4e2a24c03133?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false
  },
  {
    id: 7,
    title: "Charming Boston Brownstone",
    price: 980000,
    address: "101 Beacon Street",
    city: "Boston",
    state: "MA",
    type: "house",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3100,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1694475477920-8064c7783ed9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    featured: false
  },
  {
  id: 8,
  title: "Historic Victorian Mansion",
  price: 1850000,
  address: "240 Grand Avenue",
  city: "Savannah",
  state: "GA",
  type: "house",
  bedrooms: 6,
  bathrooms: 5,
  sqft: 4500,
  imageUrl: 'https://images.unsplash.com/photo-1698852880899-60633378ff6f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  featured: false
  },
  {
  id: 9,
  title: "Stunning Beachfront Villa",
  price: 3200000,
  address: "55 Pacific Coast Highway",
  city: "Malibu",
  state: "CA",
  type: "house",
  bedrooms: 5,
  bathrooms: 6,
  sqft: 5200,
  imageUrl: 'https://plus.unsplash.com/premium_photo-1661913412680-c274b6fea096?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  featured: true
  }
];

function PropertyCard({ property, isFavorite, onToggleFavorite, formatPrice }: {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (price: number) => string;
}) {
  return (
    // MODIFIED: Added dark mode classes
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
        <button
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          // MODIFIED: Added dark mode classes for the favorite button background
          className={`absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 dark:bg-gray-700 dark:bg-opacity-75 dark:hover:bg-opacity-100 transition-colors text-red-500 ${isFavorite ? 'text-red-600' : 'text-red-400'}`}
        >
          <Heart fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        {/* MODIFIED: Added dark mode classes for text */}
        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate" title={property.title}>{property.title}</h4>
        <p className="text-blue-600 dark:text-blue-400 font-bold mb-2">{formatPrice(property.price)}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {property.address}, {property.city}, {property.state}
        </p>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {property.bedrooms}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {property.bathrooms}
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" /> {property.sqft} sqft
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
  
  // ADDED: State for theme management
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // ADDED: Effect to handle theme changes and persistence
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // ADDED: Function to toggle the theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          property.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || property.type === selectedType;
      
      let matchesPrice = true;
      if (priceRange === 'under-500k') matchesPrice = property.price < 500000;
      else if (priceRange === '500k-1m') matchesPrice = property.price >= 500000 && property.price < 1000000;
      else if (priceRange === 'over-1m') matchesPrice = property.price >= 1000000;
      
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchTerm, selectedType, priceRange]);

  const toggleFavorite = (propertyId: number) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    // MODIFIED: Added dark mode classes to the main container
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      {/* MODIFIED: Added dark mode classes */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">HomeNest Realty</h1>
            </div>
            <div className="flex items-center gap-8"> {/* ADDED: Wrapper for nav and theme toggle */}
              <nav className="hidden md:flex space-x-8">
                {/* MODIFIED: Added dark mode classes */}
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Buy</button>
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Rent</button>
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sell</button>
                <button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</button>
              </nav>
              {/* ADDED: Theme toggle button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        {/* No dark mode changes needed here as it has a solid background */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Find Your Dream Home</h2>
            <p className="text-xl text-blue-100">Discover the perfect property in your ideal location</p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location, address, or property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // MODIFIED: Added dark mode classes for input
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      {/* MODIFIED: Added dark mode classes */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                // MODIFIED: Added dark mode classes
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              
              <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 w-full md:w-auto`}>
                {/* Property Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  // MODIFIED: Added dark mode classes
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                </select>

                {/* Price Range Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  // MODIFIED: Added dark mode classes
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="over-1m">Over $1M</option>
                </select>
              </div>
            </div>
            
            {/* MODIFIED: Added dark mode classes */}
            <div className="text-gray-600 dark:text-gray-400">
              {filteredProperties.length} properties found
            </div>
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Properties */}
          {filteredProperties.some(p => p.featured) && (
            <div className="mb-12">
              {/* MODIFIED: Added dark mode classes */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Featured Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.filter(p => p.featured).map(property => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={toggleFavorite}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Properties */}
          <div>
            {/* MODIFIED: Added dark mode classes */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">All Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              {/* MODIFIED: Added dark mode classes */}
              <p className="text-gray-500 dark:text-gray-400 text-lg">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      {/* Footer is already dark, so minimal changes needed */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold">HomeNest Realty</h3>
              </div>
              <p className="text-gray-400">Your trusted partner in finding the perfect home.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">About Us</button></li>
                <li><button className="hover:text-white transition-colors">Careers</button></li>
                <li><button className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Buy Property</button></li>
                <li><button className="hover:text-white transition-colors">Sell Property</button></li>
                <li><button className="hover:text-white transition-colors">Rent Property</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-white transition-colors">Facebook</button></li>
                <li><button className="hover:text-white transition-colors">Twitter</button></li>
                <li><button className="hover:text-white transition-colors">Instagram</button></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
