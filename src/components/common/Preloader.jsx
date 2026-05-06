import React from 'react';
import logo from '/PEPAL_BARRY_LOGO.png';

const Preloader = ({ message = "Welcome to Pepal Barry" }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-8 text-center transition-all duration-700">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>

            <div className="relative mb-10 flex flex-col items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-125 animate-pulse"></div>
                    <img
                        src={logo}
                        alt="PEPAL BARRY"
                        className="md:w-32 md:h-32 w-24 h-24 rounded-full object-cover shadow-2xl relative z-10 border-4 border-white"
                    />
                </div>
            </div>

            <div className="max-w-[280px] sm:max-w-sm mx-auto space-y-8">
                <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-bold">
                        Est. 2025
                    </p>
                    <h2 className="text-xl md:text-2xl font-display font-medium text-heading leading-tight">
                        {message}
                    </h2>
                </div>

                <div className="flex justify-center items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                </div>
            </div>

            {/* Bottom Tagline */}
            <div className="absolute bottom-12 left-0 right-0">
                <p className="text-[9px] uppercase tracking-[0.5em] text-subtle/50 font-medium">
                    Handcrafted Nourishment
                </p>
            </div>
        </div>
    );
};

export default Preloader;
