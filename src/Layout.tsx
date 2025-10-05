import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
const Footer = React.lazy(() => import("./components/Footer"));

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
