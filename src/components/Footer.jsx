import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

const socialLinks = [
  { id: "instagram", icon: FaInstagram, href: "https://www.instagram.com/pepalbarry/" },
  { id: "facebook", icon: FaFacebookF, href: "https://www.facebook.com/pepalbarry/" },
];

export default function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL || "http://localhost:5000"}/api/newsletter`, { email });
      setMessage(res.data.message);
      setEmail("");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { label: "Shop", href: "/shop" },
    ...(user
      ? [
        { label: "Profile", href: "/profile" },
        { label: "Orders", href: "/orders" },
      ]
      : []),
  ];

  return (
    <footer className="mt-24 bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-16 lg:grid-cols-[1.5fr_1fr_1.5fr]">
        {/* Brand Column */}
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-background font-bold">
            PEPAL BARRY
          </p>
          <h3 className="text-3xl sm:text-4xl font-display leading-[1.1] max-w-md">
            Modern cookie jars, made functional.
          </h3>
          <p className="text-base text-background/60 leading-relaxed max-w-sm">
            Family-owned micro-bakery. We only ship what we’d send to our own dinner table.
          </p>
          <div className="flex gap-4 pt-4">
            {socialLinks.map(({ id, icon: Icon, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label={`Follow us on ${id}`}
              >
                <Icon className="text-lg size-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Quick links</h4>
          <ul className="space-y-4 text-background/60">
            {quickLinks.map((link) => (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    className="hover:text-background transition-colors duration-300"
                    to={link.href}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    className="hover:text-background transition-colors duration-300"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold">Stay in touch</h4>
          <p className="text-background/60 text-sm leading-relaxed">
            Join the drop list for flavor restocks & weekend farmer's market pop-ups.
          </p>

          <form
            className="group relative flex items-center"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full bg-background/5 border border-background/10 rounded-full pl-5 pr-32 py-4 text-sm text-background placeholder:text-background/40 focus:outline-none focus:bg-background/10 focus:border-background/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-1.5 top-1.5 bottom-1.5 bg-background text-foreground rounded-full px-6 text-xs sm:text-sm font-bold tracking-wide hover:bg-background/90 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "Notify me"}
            </button>
          </form>
          {message ? (
            <p className="text-[10px] sm:text-xs mt-2 font-medium tracking-wide animate-pulse">
              {message}
            </p>
          ) : (
            <p className="text-[10px] text-background/40 uppercase tracking-wider mt-2">
              No spam, just jars.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 py-8 text-center">
        <p className="text-xs text-background/40 uppercase tracking-widest">
          © {new Date().getFullYear()} PEPAL BARRY Collective. All slow baked.
        </p>
      </div>
    </footer>
  );
}
