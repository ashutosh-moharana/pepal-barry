import { Link } from "react-router-dom";
import heroImage from "/cookie.webp";
import Button from "./common/Button";
import { PiStarFourFill } from "react-icons/pi";
import { useAuth } from "../context/AuthContext";

const stats = [
  { label: "Sugar swaps", value: "0 Refined" },
  { label: "Repeat buyers", value: "1k+" },
  { label: "Delivery cities", value: "15" },
];

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#fdf8f4]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60 mix-blend-multiply filter" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl opacity-60 mix-blend-multiply filter" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 order-1 lg:order-1">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              <PiStarFourFill className="text-xs" />
              <span>Pepal Barry</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-heading tracking-tight">
              Pure <span className="text-primary italic font-serif">joy</span> in <br />
              every bite.
            </h1>

            <p className="text-lg md:text-xl text-subtle/90 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Baked slow and with care, these cookies remind you that the best things in India were never rushed, overprocessed, or loud about it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/shop" className="w-full sm:w-auto">
              <Button className="w-full h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Shop the jars
              </Button>
            </Link>
            {!user && (
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/5">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Stats - Desktop */}
          <div className="hidden lg:grid grid-cols-3 gap-8 pt-8 border-t border-primary/10 w-full">
            {stats.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="text-2xl font-display font-medium text-heading">{value}</p>
                <p className="text-xs uppercase tracking-wider text-subtle font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Content */}
        <div className="relative order-2 lg:order-2 group perspective-1000">
          <div className="relative z-10 p-8 transform transition-transform duration-700 ease-out hover:rotate-y-6 hover:rotate-x-6">
            {/* Abstract organic shape background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-morph blur-2xl opacity-70" />

            {/* Glass decoration */}
            <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-[3rem] border border-white/40 shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" />

            <img
              src={heroImage}
              alt="PEPAL BARRY Collection"
              className="relative w-full max-w-md mx-auto lg:max-w-full rounded-[2.5rem] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500"
            />

            {/* Floating Tag */}
            <div className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-white/90 backdrop-blur-md border border-white/60 p-4 pr-6 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dbece2] flex items-center justify-center text-primary">
                <PiStarFourFill className="text-lg" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-subtle font-bold tracking-wider">Est. 2025</p>
                <p className="text-sm font-semibold text-heading">Small Batch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile only */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full border-t border-primary/10 pt-6 lg:hidden order-3">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xl sm:text-2xl font-display font-medium text-heading">{value}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-subtle font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
