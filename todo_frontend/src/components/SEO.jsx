import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords = "",
  canonicalUrl,
  image = "/logo.png",
  type = "website",
  children,
}) => {
  // Ensure title has the app name
  const fullTitle = title
    ? `${title} | NoteVue`
    : "NoteVue - Task and Note Management App";

  // Default description if none provided
  const metaDescription =
    description ||
    "Manage your tasks and notes efficiently with NoteVue, the all-in-one productivity application.";

  // Build the full canonical URL
  const siteUrl = "https://notevue.com";
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional meta tags */}
      {children}
    </Helmet>
  );
};

export default SEO;
