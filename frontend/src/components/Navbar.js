import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plane, Compass, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Desktop & Tablet Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-white/10 flex items-center px-6 gap-4 animate-slide-down">
                {/* Brand */}
                <a href="/" className="flex items-center gap-2 mr-auto">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                        <Plane size={18} className="text-white -rotate-12" />
                    </div>
                    <span className="text-lg font-bold text-white hidden sm:inline">
                        Travel<span className="text-gradient">SaaS</span>
                    </span>
                </a>

                {/* Desktop Navigation */}
                {user && (
                    <>
                        <div className="hidden md:flex items-center gap-1">
                            <a
                                href="/discover"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <Compass size={16} />
                                Discover
                            </a>
                            <a
                                href="/dashboard"
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <LayoutDashboard size={16} />
                                Dashboard
                            </a>
                        </div>

                        {/* Desktop Logout */}
                        <button
                            onClick={logout}
                            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </>
                )}
            </nav>

            {/* Mobile Menu */}
            {user && mobileMenuOpen && (
                <div className="fixed top-16 inset-x-0 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-white/10 md:hidden animate-slide-down">
                    <div className="flex flex-col p-4 gap-2">
                        <a
                            href="/discover"
                            className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Compass size={16} />
                            Discover
                        </a>
                        <a
                            href="/dashboard"
                            className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </a>
                        <button
                            onClick={() => {
                                logout();
                                setMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full text-left"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
