import { mockProperties, mockRentProperties } from "./properties";
export type HomeListing = {
  id: string;
  listingType: "buy" | "rent";
  taxHistory: { year: number; tax: number; assessment: number }[];
  interior: string[];
  nearbyCities: { name: string; time: string }[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  status: string;
  imageUrl: string;
  imageAlt: string;
  featuredLabel: string | null;
  daysOnMarket: number;
  monthlyTax: number;
  hoaMonthly: number;
  mapX: number;
  mapY: number;
  description: string;
  highlights: string[];
  schools: {
    id: string;
    name: string;
    rating: number;
    grades: string;
    distance: string;
    schoolType: string;
  }[];
  history: {
    id: string;
    eventDate: string;
    event: string;
    price: number;
  }[];
};


export function getHomes(mode: "buy" | "rent"): HomeListing[] {
  return (mode === "buy" ? mockProperties : mockRentProperties).map((p) => ({
    id: String(p.id), listingType: mode, address: p.address, city: p.city, state: p.state, zipCode: p.zipCode,
    price: p.price, bedrooms: p.bedrooms, bathrooms: p.bathrooms, squareFeet: p.sqft,
    lotSize: p.propertyDetails.lotSize, yearBuilt: p.propertyDetails.yearBuilt,
    propertyType: p.type === "house" ? "Single-family" : p.type === "condo" ? "Condo" : "Apartment",
    status: mode === "buy" ? "For sale" : "For rent", imageUrl: p.imageUrl, imageAlt: p.title,
    featuredLabel: p.featured ? "Featured home" : null, daysOnMarket: 0,
    monthlyTax: (p.taxHistory[0]?.tax ?? 0) / 12, hoaMonthly: 0,
    mapX: 0, mapY: 0, description: p.description, highlights: p.features,
    schools: p.schools.map((s, i) => ({ ...s, id: `${p.id}-school-${i}`, grades: "Check with district", schoolType: "School" })),
    history: p.priceHistory.map((h, i) => ({ id: `${p.id}-history-${i}`, eventDate: h.date, event: h.event, price: h.price })),
    taxHistory: p.taxHistory,
    interior: [p.interiorFeatures.heating, p.interiorFeatures.cooling, p.interiorFeatures.flooring, p.propertyDetails.parking, ...p.interiorFeatures.appliances],
    nearbyCities: p.nearbyCities,
  }));
}
