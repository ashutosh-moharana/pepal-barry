import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "/PEPAL_BARRY_LOGO.png";
import Button from "./common/Button";


const links = [
  { label: "Shop", href: "/shop" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close menu on scroll and click outside
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false);
      if (profileMenuOpen) setProfileMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        if (!event.target.closest('button[aria-label="Toggle menu"]')) {
          setMenuOpen(false);
        }
      }
      if (profileMenuOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    if (menuOpen || profileMenuOpen) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, profileMenuOpen]);


  const avatarSrc =
    user?.picture?.replace?.("s96-c", "s80-c") ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Guest"
    )}`;

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <nav className="max-w-6xl mx-auto rounded-full border border-white/60 bg-white/80 backdrop-blur-2xl px-5 sm:px-8 py-3 flex items-center justify-between shadow-soft relative z-50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="PEPAL BARRY" className="w-12 h-12 rounded-full object-cover" />
          <span className="inline text-lg font-semibold text-heading">
            PEPAL BARRY
          </span>
        </Link>

        <button
          className="md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-subtle">
          {links.map((link) => (
            <li key={link.label}>
              <Link className="hover:text-heading transition" to={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link className="hover:text-heading transition" to="/orders">
                  Orders
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div
              ref={profileMenuRef}
              className="relative"
            >
              <button
                className="w-11 h-11 rounded-full border-2 border-primary overflow-hidden"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <img src={avatarSrc} alt={user.name} className="w-full h-full object-cover" />
              </button>
              <div
                className={`absolute  top-full bg-card border border-primary/15 rounded-2xl shadow-soft min-w-[200px] transition-all duration-150 ${profileMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
                  }`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-muted rounded-t-2xl"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 hover:bg-muted border-t border-primary/10"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Order history
                </Link>
                {user.role === "admin" && (
                  (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 hover:bg-muted border-t border-primary/10"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-muted rounded-b-2xl border-t border-primary/10"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="text-sm">Create account</Button>
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute top-20 left-4 right-4 rounded-3xl border border-primary/20 bg-white/95 backdrop-blur-xl shadow-soft px-5 py-4 space-y-4 transition-all duration-300 origin-top ease-in-out z-40 ${menuOpen
          ? "opacity-100 translate-y-0 scale-100 visible"
          : "opacity-0 -translate-y-4 scale-95 invisible"
          }`}
      >
        <ul className="space-y-3 text-sm font-medium text-subtle">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="block w-full text-center px-4 py-3 bg-gray-50 rounded-xl active:scale-95 transition-transform duration-100 text-heading font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user && (
            <>
              <li>
                <Link
                  to="/orders"
                  className="block w-full text-center px-4 py-3 bg-gray-50 rounded-xl active:scale-95 transition-transform duration-100 text-heading font-semibold"
                  onClick={() => setMenuOpen(false)}
                >
                  Orders
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex flex-col gap-2">
          {user ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Profile
                </Button>
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <Button className="w-full">Create account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
