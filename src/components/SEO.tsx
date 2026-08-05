import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  name?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  type = 'website',
  name = 'Pak99 Traveling & Tours'
}) => {
  const defaultTitle = 'Pak99 Traveling & Tours | Luxury Travel & Umrah Packages';
  const defaultDescription = 'Discover premium tour packages across Pakistan, seamless Umrah services, international study abroad programs, and luxury hotel bookings with Pak99 Traveling & Tours.';
  const defaultKeywords = 'travel, tours, umrah, pakistan tours, hunza tours, study abroad, international visas, luxury hotels';

  const finalTitle = title ? `${title} | ${name}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:site_name" content={name} />

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
};
