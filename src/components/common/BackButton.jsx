import { useLocation, useNavigate } from "react-router-dom";
import { PiArrowLeftBold } from "react-icons/pi";

export default function BackButton({
  fallback = "/",
  warnOnPaths = ["/checkout"],
  confirmMessage = "Leaving checkout will cancel your order. Do you still want to go back?",
  useHistoryFirst = true,
  className = "",
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {

    const shouldWarn = warnOnPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    if (shouldWarn) {
      const shouldLeave = window.confirm(confirmMessage);
      if (!shouldLeave) return;
      navigate(fallback, { replace: true });
      return;
    }


    if (useHistoryFirst && window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-primary/10 shadow-soft flex items-center justify-center text-primary transition-all duration-300 active:scale-95 group ${className}`}
      aria-label="Go back"
    >
      <PiArrowLeftBold className="text-xl transition-transform duration-300" />
    </button>
  );
}