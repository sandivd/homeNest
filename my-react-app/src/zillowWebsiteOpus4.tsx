import React, { useState, useMemo } from 'react';
import { Search, Bed, Bath, Square, MapPin, Heart, Filter, Home, Building, DollarSign } from 'lucide-react';

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
    featured: true
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
  }
];

function PropertyCard({ property, isFavorite, onToggleFavorite, formatPrice }: {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover" />
        <button
          onClick={() => onToggleFavorite(property.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition-colors text-red-500 ${isFavorite ? 'text-red-600' : 'text-red-400'}`}
        >
          <Heart fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-1 truncate" title={property.title}>{property.title}</h4>
        <p className="text-blue-600 font-bold mb-2">{formatPrice(property.price)}</p>
        <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {property.address}, {property.city}, {property.state}
        </p>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">DreamHome</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Buy</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Rent</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Sell</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
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
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              
              <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 w-full md:w-auto`}>
                {/* Property Type Filter */}
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="over-1m">Over $1M</option>
                </select>
              </div>
            </div>
            
            <div className="text-gray-600">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h3>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">All Properties</h3>
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
              <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold">DreamHome</h3>
              </div>
              <p className="text-gray-400">Your trusted partner in finding the perfect home.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rent Property</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
