import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Product from "../components/Product";
import Footer from "../components/Footer";
import Highlights from "../components/Highlights";
import { useSEO } from "../hooks/useSEO";

export default function Home() {
  useSEO({
    title: "Artisanal Jars",
    description: "Handcrafted functional treats made with minimal ingredients and maximal nourishment.",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16 space-y-16 md:space-y-20">
        <Hero />
        <Product />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}
