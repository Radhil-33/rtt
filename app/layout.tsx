import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Rashmi Tours and Travels | Cab Service Madurai | South India Tours",
    template: "%s | Rashmi Tours and Travels",
  },
  description: "Rashmi Tours and Travels – Premium cab service in Madurai for pilgrimages, hill stations, and inter-city travel across South India. Book cabs to Rameswaram, Kodaikanal, Ooty, Kanyakumari and more.",
  keywords: ["cab service Madurai", "tours Madurai", "Madurai to Rameswaram cab", "South India tour packages", "pilgrimage cab Tamil Nadu", "Rashmi Tours"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rashmitours.in",
    siteName: "Rashmi Tours and Travels",
    title: "Rashmi Tours and Travels | Cab Service Madurai",
    description: "Premium cab and tour packages across South India.",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rashmitours.in" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
  rel="stylesheet"
/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Rashmi Tours and Travels",
          description: "Premium cab service and tour packages from Madurai across South India.",
          url: "https://rashmitours.in",
          telephone: "+91-9790699932",
          address: { "@type": "PostalAddress", addressLocality: "Madurai", addressRegion: "Tamil Nadu", addressCountry: "IN" },
          openingHours: "Mo-Su 00:00-24:00",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "520" },
        }) }} />
      </head>
      <body>
        <Toaster position="top-right" toastOptions={{ style: { fontFamily: "'DM Sans', sans-serif", borderRadius: "12px", background: "#1A0F05", color: "#FDF8F0" }, success: { iconTheme: { primary: "#E8651A", secondary: "#FDF8F0" } } }} />
        {children}
      </body>
    </html>
  );
}
