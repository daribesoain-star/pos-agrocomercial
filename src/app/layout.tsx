import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POS Distribuidora Agrocomercial",
  description: "Sistema de Punto de Venta - Distribuidora Agrocomercial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
