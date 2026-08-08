import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { settingsAPI } from '../services/api';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  name?: string;
  canonicalPath?: string;
  image?: string;
  noindex?: boolean;
}

const SITE_URL = 'https://pak99traveling.com';
const SITE_NAME = 'Pak99 Travel & Tours';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  type = 'website',
  name = SITE_NAME,
  canonicalPath,
  image,
  noindex = false
}) => {
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    settingsAPI.get().then(setSettings).catch(console.error);
  }, []);

  const phone1 = settings?.phone1 || '0310-8032999';
  const phone2 = settings?.phone2 || '051-2757282';
  const phone3 = settings?.phone3 || '';
  const fbook = settings?.facebookUrl || "https://www.facebook.com/people/PAK99-Travel-TOURS/61583047934939/";
  const insta = settings?.instagramUrl || "https://www.instagram.com/pak99_travel/";
  
  const sameAsLinks = [fbook, insta].filter(Boolean);
  if (settings?.twitterUrl) sameAsLinks.push(settings.twitterUrl);

  const telephones = [`+92-${phone1.replace(/[^0-9]/g, '')}`, `+92-${phone2.replace(/[^0-9]/g, '')}`];
  if (phone3) telephones.push(`+92-${phone3.replace(/[^0-9]/g, '')}`);
  if (settings?.whatsappNumber) telephones.push(`+${settings.whatsappNumber.replace(/[^0-9]/g, '')}`);

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "name": "Pak99 Travel & Tours",
    "alternateName": "PAK 99 Travel and Tours",
    "url": SITE_URL,
    "logo": DEFAULT_IMAGE,
    "image": DEFAULT_IMAGE,
    "description": "Pakistan's premier travel agency offering luxury Northern Pakistan tours (Hunza, Skardu, Swat, Naran, Fairy Meadows), Umrah packages, international tours, visa services, study abroad consultancy, hotel bookings, flight tickets, and travel insurance from Islamabad.",
    "telephone": telephones,
    "email": "info@pak99traveling.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office No. 03 Nawaz Arcade, National Police Foundation",
      "addressLocality": "PWD Islamabad",
      "addressRegion": "Islamabad Capital Territory",
      "postalCode": "44000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.6844",
      "longitude": "73.0479"
    },
    "areaServed": [
      { "@type": "Country", "name": "Pakistan" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Germany" }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": sameAsLinks,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Pakistan Tours",
          "description": "Luxury tour packages to Hunza, Skardu, Swat, Naran, Fairy Meadows, Neelum Valley"
        },
        {
          "@type": "OfferCatalog",
          "name": "International Tours",
          "description": "Group and family tours to Dubai, Turkey, Baku, Thailand, Malaysia"
        },
        {
          "@type": "OfferCatalog",
          "name": "Umrah Packages",
          "description": "Economy and luxury Umrah packages with 4 & 5 star hotels near Haram"
        },
        {
          "@type": "OfferCatalog",
          "name": "Visa Services",
          "description": "Tourist visa, visit visa, and work visa assistance for multiple countries"
        },
        {
          "@type": "OfferCatalog",
          "name": "Study Abroad",
          "description": "University admissions and student visa for UK, Australia, Canada, Germany"
        }
      ]
    }
  };

  const defaultTitle = 'Pak99 Travel & Tours | Best Travel Agency in Islamabad Pakistan - Tours, Umrah, Visa';
  const defaultDescription = `Pak99 Travel & Tours — Islamabad's top-rated travel agency. Book luxury Northern Pakistan tours (Hunza, Skardu, Swat, Naran), Umrah packages, international tours, visa services, study abroad programs, hotel bookings & flight tickets. Call ${phone1}.`;
  const defaultKeywords = 'travel agency islamabad, travel agency pakistan, pakistan tours, northern pakistan tours, hunza tour package, skardu tour package, swat tour package, naran kaghan tour, fairy meadows tour, umrah packages pakistan, umrah packages islamabad, cheap umrah packages, international tours pakistan, dubai tour package, turkey tour package, baku tour, thailand tour, visa services pakistan, visit visa, study abroad pakistan, study in uk, study in australia, study in canada, study in germany, hotel booking pakistan, flight tickets pakistan, travel insurance pakistan, pak99, pak 99 travel, pak99 tours, best travel agency islamabad, best tour operator pakistan, family tours pakistan, honeymoon packages pakistan, group tours pakistan';

  const finalTitle = title ? `${title} | ${name}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || DEFAULT_IMAGE;
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Geo Targeting for Pakistan */}
      <meta name="geo.region" content="PK-IS" />
      <meta name="geo.placename" content="Islamabad" />
      <meta name="geo.position" content="33.6844;73.0479" />
      <meta name="ICBM" content="33.6844, 73.0479" />

      {/* Language & Content */}
      <meta httpEquiv="content-language" content="en-PK" />
      <meta name="language" content="English" />
      <meta name="author" content={name} />

      {/* OpenGraph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:locale" content="en_PK" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(businessJsonLd)}
      </script>
    </Helmet>
  );
};
