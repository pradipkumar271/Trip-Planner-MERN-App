import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    Plane,
    Compass,
    LayoutDashboard,
    Home,
    Info,
    LifeBuoy,
    PhoneCall,
    MessageCircle,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const commonLinks = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Info },
    { to: '/support', label: 'Support', icon: LifeBuoy },
    { to: '/contact', label: 'Contact', icon: PhoneCall },
];

const privateLinks = [
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/chatbot', label: 'Chatbot', icon: MessageCircle },
];

const desktopLinkClassName = ({ isActive }) =>
    [
        'flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300',
        isActive
            ? 'text-white bg-white/15 border border-white/20 shadow-inner shadow-white/5'
            : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent',
    ].join(' ');

const mobileLinkClassName = ({ isActive }) =>
    [
        'flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300',
        isActive ? 'text-white bg-white/15 border border-white/20' : 'text-white/70 hover:text-white hover:bg-white/10',
    ].join(' ');

const Navbar = () => {
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const allLinks = user ? [...commonLinks, ...privateLinks] : commonLinks;

    return (
        <>
            <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-dark-900/80 backdrop-blur-xl border-b border-white/10 flex items-center px-6 gap-4 animate-slide-down">
                <NavLink to="/home" className="flex items-center gap-2 mr-auto">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                        <Plane size={18} className="text-white -rotate-12" />
                    </div>
                    <span className="text-lg font-bold text-white hidden sm:inline">
                        Travel<span className="text-gradient">SaaS</span>
                    </span>
                </NavLink>

                <div className="hidden md:flex items-center gap-1">
                    {allLinks.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink key={item.to} to={item.to} className={desktopLinkClassName}>
                                <Icon size={16} />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </div>

                {user ? (
                    <button
                        onClick={logout}
                        className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                ) : (
                    <div className="hidden md:flex items-center gap-2">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                                    ? 'text-white bg-white/15 border border-white/20'
                                    : 'text-white/75 hover:text-white hover:bg-white/10 border border-transparent'
                                }`
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-600 to-cyan-500 text-white hover:shadow-glow-blue transition-all duration-300"
                        >
                            Register
                        </NavLink>
                    </div>
                )}

                <button
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
                    aria-label="Toggle mobile menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            {mobileMenuOpen && (
                <div className="fixed top-16 inset-x-0 z-40 bg-dark-900/95 backdrop-blur-xl border-b border-white/10 md:hidden animate-slide-down">
                    <div className="flex flex-col p-4 gap-2">
                        {allLinks.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={mobileLinkClassName}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <Icon size={16} />
                                    {item.label}
                                </NavLink>
                            );
                        })}

                        {user ? (
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
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={mobileLinkClassName}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-600 to-cyan-500 text-white hover:shadow-glow-blue transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
