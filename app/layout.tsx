import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { NotesProvider } from "@/context/store";
import { ThemeProvider } from "@/context/theme";
import { Suspense } from "react";

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex"
});

export const metadata: Metadata = {
  title: "Supernotes",
  description: "Create notes and save them right to your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en" className="night">
        <Suspense>
          <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
            <Navbar />
            <NotesProvider>
              {children}
            </NotesProvider>
          </body>
        </Suspense>
      </html>
    </ThemeProvider>
  );
}
