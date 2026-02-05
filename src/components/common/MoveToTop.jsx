import { useState, useEffect } from "react";
import Button from "./Button";

export default function MoveToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={`fixed bottom-6 right-6 z-40 md:hidden transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
            <button
                onClick={scrollToTop}
                className="bg-primary text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-primary/90 transition-colors"
                aria-label="Scroll to top"
            >
                ↑
            </button>
        </div>
    );
}
