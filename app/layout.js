import "./globals.css";

export const metadata = {
  title: "ClientPilot AI",
  description: "AI-powered client outreach & follow-up automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
