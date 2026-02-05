import React from 'react';
import logo from '/PEPAL_BARRY_LOGO.png';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-500">
            <div className="flex flex-col items-center md:gap-8 gap-4">
                <img
                    src={logo}
                    alt="PEPAL BARRY"
                    className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover"
                />
                <div className="flex md:gap-4 gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
