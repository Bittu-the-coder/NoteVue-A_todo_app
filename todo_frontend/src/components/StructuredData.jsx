import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = ({ path, userData = null }) => {
  const baseUrl = "https://notevue.com";
  const fullUrl = `${baseUrl}${path}`;

  // Base organization data that will be used across all pages
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "NoteVue",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
  };

  // Page-specific schema based on path
  let pageSpecificData = {};

  switch (path) {
    case "/":
      pageSpecificData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: baseUrl,
        name: "NoteVue - Task and Note Management App",
        description:
          "Organize your day, thoughts, and goals — all in one beautifully simple place.",
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "/dashboard":
      pageSpecificData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: fullUrl,
        name: userData?.username
          ? `${userData.username}'s Dashboard | NoteVue`
          : "Dashboard | NoteVue",
        description:
          "Manage your daily tasks, view your productivity stats, and access your recent notes all in one place.",
      };
      break;

    case "/sticky-wall":
      pageSpecificData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: fullUrl,
        name: "Sticky Wall | NoteVue",
        description:
          "Organize your thoughts with digital sticky notes. Create, edit, and manage your notes in one place.",
      };
      break;

    case "/login":
    case "/signup":
      pageSpecificData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: fullUrl,
        name: path === "/login" ? "Login | NoteVue" : "Sign Up | NoteVue",
        description:
          path === "/login"
            ? "Login to your NoteVue account to manage your tasks and notes."
            : "Create a new NoteVue account to start organizing your tasks and notes.",
      };
      break;

    default:
      pageSpecificData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        url: fullUrl,
      };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageSpecificData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
