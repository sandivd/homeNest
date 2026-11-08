export interface Property {
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

export const mockProperties: Property[] = [
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


export const mockRentProperties: Property[] = [
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