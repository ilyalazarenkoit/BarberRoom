import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Room",
  description: "Професійний барбершоп у Києві",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
