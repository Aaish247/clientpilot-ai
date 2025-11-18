import "./globals.css";

export const metadata = {
  title: "ClientPilot AI",
  description: "Cold email generator for freelancers & agencies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: "#fafafa",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
