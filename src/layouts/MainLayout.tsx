import { type ReactNode } from "react";
import Header from "@components/Header";
import Footer from "@components/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-base-300">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
