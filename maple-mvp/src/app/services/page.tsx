"use client";

import { initI18n } from "@/i18n/config";
import { getProfile } from "@/lib/storage/local";
import Map from "@/components/Map";
import MarkerList from "@/components/MarkerList";
import Link from "next/link";

const directoryLinks: Record<string, string> = {
  national: "https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada/service-canada-offices.html",
  on: "https://www.ontario.ca/page/serviceontario",
  bc: "https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/citizens-services/servicebc",
  qc: "https://www.quebec.ca/en/government/services-quebec"
};

export default function ServicesPage() {
  initI18n();
  const profile = getProfile();
  const province = profile?.province;
  const dir = province && directoryLinks[province] ? directoryLinks[province] : directoryLinks.national;
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Services</h1>
      <p className="text-gray-700 dark:text-gray-300">Curated Service Canada and provincial service centres. For full directories, see the official sites below.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Map province={province} />
        </div>
        <div>
          <MarkerList province={province} />
        </div>
      </div>
      <div className="pt-2 text-sm">
        <div>
          Official directories: {" "}
          <Link className="underline" href={directoryLinks.national} target="_blank">Service Canada</Link>
          {province && (
            <>
              {" · "}
              <Link className="underline" href={dir} target="_blank">Provincial</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
