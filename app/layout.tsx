import "./globals.css";

export const metadata = {
  title: "ClientPilot AI",
  description: "AI tools for clients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
