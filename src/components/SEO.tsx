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
  jsonLd?: object | object[];
}

const SITE_URL = 'https://www.pak99travels.com';
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
  noindex = false,
  jsonLd,
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
    "alternateName": ["PAK 99 Travel and Tours", "Pak99 Traveling", "PAK99 Tours", "Pak 99 Travels"],
    "url": SITE_URL,
    "logo": DEFAULT_IMAGE,
    "image": DEFAULT_IMAGE,
    "description": "Pakistan's premier travel agency offering luxury Northern Pakistan tours (Hunza, Skardu, Swat, Naran, Fairy Meadows), Umrah packages from Lahore Islamabad Faisalabad Multan, international tours (Dubai, Turkey, Baku, Thailand), visa services for 50+ countries, study abroad consultancy (UK, Australia, Canada, Germany), hotel bookings, flight tickets, and travel insurance. Based in Islamabad serving all of Pakistan.",
    "telephone": telephones,
    "email": "info@pak99travels.com",
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
      { "@type": "City", "name": "Islamabad" },
      { "@type": "City", "name": "Rawalpindi" },
      { "@type": "City", "name": "Lahore" },
      { "@type": "City", "name": "Karachi" },
      { "@type": "City", "name": "Faisalabad" },
      { "@type": "City", "name": "Multan" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Turkey" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "Australia" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Germany" },
      { "@type": "Country", "name": "Azerbaijan" },
      { "@type": "Country", "name": "Thailand" },
      { "@type": "Country", "name": "Malaysia" }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "PKR",
    "paymentAccepted": "Cash, Bank Transfer",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": sameAsLinks,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "5000",
      "bestRating": "5"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Travel Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Pakistan Tours",
          "description": "Luxury tour packages to Hunza Valley, Skardu, Swat Valley, Naran Kaghan, Fairy Meadows, Neelum Valley, Gilgit Baltistan, Kashmir, Chitral, Kumrat Valley from Islamabad"
        },
        {
          "@type": "OfferCatalog",
          "name": "International Tours",
          "description": "Group and family tours from Pakistan to Dubai UAE, Turkey Istanbul, Baku Azerbaijan, Thailand Bangkok, Malaysia Kuala Lumpur, Egypt, Maldives"
        },
        {
          "@type": "OfferCatalog",
          "name": "Umrah Packages",
          "description": "Economy and 5-star luxury Umrah packages from Lahore, Islamabad, Faisalabad, Multan with walking distance hotels near Haram in Makkah and Madinah"
        },
        {
          "@type": "OfferCatalog",
          "name": "Visa Services",
          "description": "Tourist visa, visit visa, work visa, student visa processing for UAE, Saudi Arabia, UK, USA, Canada, Australia, Turkey, Schengen Europe, China, Japan, South Korea, Malaysia, Thailand, Bahrain, Oman, Qatar, Kuwait and 50+ countries"
        },
        {
          "@type": "OfferCatalog",
          "name": "Study Abroad Consultancy",
          "description": "University admissions, student visa assistance and scholarship guidance for UK, Australia, Canada, Germany, Ireland, New Zealand from Pakistan"
        },
        {
          "@type": "OfferCatalog",
          "name": "Hotel Booking",
          "description": "Discounted luxury and budget hotel reservations across Pakistan northern areas and worldwide destinations"
        },
        {
          "@type": "OfferCatalog",
          "name": "Flight Tickets",
          "description": "Cheap group and individual air tickets from Pakistan to UAE, Saudi Arabia, UK, Bahrain, Oman, Thailand and worldwide destinations"
        },
        {
          "@type": "OfferCatalog",
          "name": "Travel Insurance",
          "description": "Comprehensive travel medical insurance, Schengen visa insurance, trip cancellation and flight insurance from Pakistan"
        }
      ]
    },
    "knowsAbout": [
      "Pakistan tourism", "Northern Pakistan tours", "Hunza Valley tours", "Skardu tours",
      "Swat Valley tours", "Naran Kaghan tours", "Fairy Meadows tours", "Neelum Valley tours",
      "Umrah packages", "Hajj packages", "International tours", "Dubai tours", "Turkey tours",
      "Visa services", "Study abroad", "Hotel booking", "Flight tickets", "Travel insurance",
      "Honeymoon packages", "Family tours", "Group tours", "Adventure tours",
      "Travel agency Islamabad", "Travel agency Pakistan"
    ]
  };

  const defaultTitle = 'Pak99 Travel & Tours | #1 Travel Agency in Pakistan - Tours, Umrah, Visa, Hotels';
  const defaultDescription = `Pak99 Travel & Tours — Pakistan's top-rated travel agency in Islamabad. Book luxury Northern Pakistan tours (Hunza, Skardu, Swat, Naran), Umrah packages, international tours (Dubai, Turkey, Baku), visa services for 50+ countries, study abroad programs, hotel bookings & flight tickets. Call ${phone1}.`;
  const defaultKeywords = 'travel agency pakistan, travel agency islamabad, pakistan travel, travel tours, best travel agency in pakistan, tour operator pakistan, travel agent islamabad, pakistan tours, northern pakistan tours, hunza tour package, skardu tour package, swat tour package, naran kaghan tour, fairy meadows tour, neelum valley tour, umrah packages pakistan, umrah packages islamabad, umrah packages lahore, cheap umrah packages 2025, international tours pakistan, dubai tour package from pakistan, turkey tour package, baku azerbaijan tour, thailand tour, visa services pakistan, visit visa, tourist visa, student visa pakistan, study abroad pakistan, study in uk, study in australia, study in canada, study in germany, hotel booking pakistan, flight tickets pakistan, travel insurance pakistan, pak99, pak 99 travel, pak99 tours, best tour operator islamabad, family tours pakistan, honeymoon packages pakistan, group tours pakistan, adventure tours pakistan, travel agency rawalpindi, travel company islamabad';

  const finalTitle = title ? `${title} | ${name}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || DEFAULT_IMAGE;
  const canonicalUrl = canonicalPath ? `${SITE_URL}${canonicalPath}` : undefined;

  // Build extra JSON-LD scripts
  const extraJsonLdScripts = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

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

      {/* JSON-LD Structured Data — Business */}
      <script type="application/ld+json">
        {JSON.stringify(businessJsonLd)}
      </script>

      {/* Extra page-specific JSON-LD */}
      {extraJsonLdScripts.map((schema, i) => (
        <script key={`jsonld-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
