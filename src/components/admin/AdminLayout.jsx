import { Link, Outlet, useLocation } from "react-router-dom";
import { PiHouse } from "react-icons/pi";

export default function AdminLayout() {
    const location = useLocation();

    const navItems = [
        { label: "Orders", path: "/admin/orders" },
        { label: "Products", path: "/admin/products" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row md:h-screen md:overflow-hidden">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-primary/10 p-4 md:p-6 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto pt-4 md:pt-6 shrink-0 z-10 sticky top-0 md:relative items-center md:items-start no-scrollbar">
                <div className="hidden md:block mb-8 mt-16">
                    <h1 className="text-xl font-bold text-heading tracking-tight">
                        PEPAL BARRY <span className="text-primary text-sm font-normal">Admin</span>
                    </h1>
                </div>

                <nav className="flex flex-row md:flex-col gap-2 md:space-y-2 w-max md:w-full items-center md:items-start">
                    <Link
                        to="/"
                        className="whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors text-subtle hover:bg-muted flex items-center gap-2 border border-border md:border-transparent md:bg-transparent"
                        title="Exit Admin"
                    >
                        <PiHouse size={18} />
                        <span className="hidden sm:inline">Home</span>
                    </Link>
                    
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.path
                                ? "bg-primary/10 text-primary"
                                : "text-subtle hover:bg-muted"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-10 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
