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
  {
    id: "sc-toronto",
    name: "Service Canada Centre — Toronto (Downtown)",
    lat: 43.6504,
    lng: -79.3839,
    url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html",
    province: "on",
    type: "service-canada",
  },
  {
    id: "sc-vancouver",
    name: "Service Canada Centre — Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html",
    province: "bc",
    type: "service-canada",
  },
  {
    id: "sc-montreal",
    name: "Service Canada Centre — Montréal",
    lat: 45.5017,
    lng: -73.5673,
    url: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html",
    province: "qc",
    type: "service-canada",
  },
  {
    id: "serviceontario-toronto",
    name: "ServiceOntario — Toronto",
    lat: 43.6532,
    lng: -79.3832,
    url: "https://www.ontario.ca/page/serviceontario",
    province: "on",
    type: "provincial",
  },
  {
    id: "servicebc-vancouver",
    name: "Service BC — Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    url: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc",
    province: "bc",
    type: "provincial",
  },
  {
    id: "services-quebec-montreal",
    name: "Services Québec — Montréal",
    lat: 45.5088,
    lng: -73.554,
    url: "https://www.quebec.ca/en/government/services-quebec",
    province: "qc",
    type: "provincial",
  }
];
