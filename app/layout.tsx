import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Rashmi Tours and Travels | Cab Service Trichy | South India Tours",
    template: "%s | Rashmi Tours and Travels",
  },
  description:
    "Rashmi Tours and Travels – Premium cab service in Trichy (Tiruchirappalli) for pilgrimages, hill stations, and inter-city travel across South India. Book cabs to Rameswaram, Kodaikanal, Ooty, Kanyakumari, Chennai and more.",
  keywords: [
    "cab service Trichy",
    "tours and travels Trichy",
    "Trichy to Rameswaram cab",
    "Trichy to Kodaikanal taxi",
    "South India tour packages",
    "pilgrimage cab Trichy Tamil Nadu",
    "Ooty cab Trichy",
    "Kanyakumari tour from Trichy",
    "Rashmi Tours Trichy",
    "Tiruchirappalli cab booking",
    "outstation cab Trichy",
  ],
  authors: [{ name: "Rashmi Tours and Travels" }],
  creator: "Rashmi Tours and Travels",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://rashmitours.in",
    siteName: "Rashmi Tours and Travels",
    title: "Rashmi Tours and Travels | Cab Service Trichy",
    description: "Premium cab and tour packages across South India from Trichy. Pilgrimages, hill stations, inter-city travel. Book now.",
    images: [{ url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", width: 1200, height: 630, alt: "Rashmi Tours and Travels" }],
  },
  twitter: { card: "summary_large_image", title: "Rashmi Tours and Travels | Cab Service Trichy", description: "Premium cab and tour packages across South India from Trichy." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: "https://rashmitours.in" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Radhil Long.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "Rashmi Tours and Travels",
          description: "Premium cab service and tour packages from Trichy (Tiruchirappalli) across South India.",
          url: "https://rashmitours.in",
          telephone: "+919790699932",
          email: "rashmitoursanddtravels@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tiruchirappalli",
            addressRegion: "Tamil Nadu",
            postalCode: "620002",
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: 10.7905, longitude: 78.7047 },
          openingHours: "Mo-Su 00:00-24:00",
          priceRange: "₹₹",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "520" },
        }) }} />
      </head>
      <body>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: "'DM Sans', sans-serif", borderRadius: "10px", background: "#1A0F05", color: "#FDF8F0", fontSize: "14px" },
            success: { iconTheme: { primary: "#E8651A", secondary: "#FDF8F0" } },
          }}
        />
        {children}
      </body>
    </html>
  );
}
