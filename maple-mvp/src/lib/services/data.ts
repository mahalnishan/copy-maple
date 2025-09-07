import { Province } from "@/lib/types";

export type ServiceMarker = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  url: string;
  province?: Province;
  type: "service-canada" | "provincial";
};

export const markers: ServiceMarker[] = [
  // Ontario
  { id: "sc-toronto", name: "Service Canada Centre — Toronto (Downtown)", lat: 43.6504, lng: -79.3839, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "on", type: "service-canada" },
  { id: "sc-mississauga", name: "Service Canada Centre — Mississauga", lat: 43.589, lng: -79.644, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "on", type: "service-canada" },
  { id: "serviceontario-toronto", name: "ServiceOntario — Toronto", lat: 43.6532, lng: -79.3832, url: "https://www.ontario.ca/page/serviceontario", province: "on", type: "provincial" },
  // British Columbia
  { id: "sc-vancouver", name: "Service Canada Centre — Vancouver", lat: 49.2827, lng: -123.1207, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "bc", type: "service-canada" },
  { id: "sc-burnaby", name: "Service Canada Centre — Burnaby", lat: 49.2488, lng: -122.9805, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "bc", type: "service-canada" },
  { id: "servicebc-vancouver", name: "Service BC — Vancouver", lat: 49.2827, lng: -123.1207, url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc", province: "bc", type: "provincial" },
  // Quebec
  { id: "sc-montreal", name: "Service Canada Centre — Montréal", lat: 45.5017, lng: -73.5673, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "qc", type: "service-canada" },
  { id: "services-quebec-montreal", name: "Services Québec — Montréal", lat: 45.5088, lng: -73.554, url: "https://www.quebec.ca/en/government/services-quebec", province: "qc", type: "provincial" },
  { id: "services-quebec-laval", name: "Services Québec — Laval", lat: 45.6066, lng: -73.7124, url: "https://www.quebec.ca/en/government/services-quebec", province: "qc", type: "provincial" },
  // National (fallback examples)
  { id: "sc-ottawa", name: "Service Canada Centre — Ottawa", lat: 45.4215, lng: -75.6972, url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html", province: "on", type: "service-canada" },
];
