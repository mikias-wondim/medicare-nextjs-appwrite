import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeModeToggle } from "@/components/ThemeModeToggle";

export const metadata: Metadata = {
  title: "MediCare",
  description: "Health Care Medical Patient Management Tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="absolute top-4 right-4">
            <ThemeModeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
