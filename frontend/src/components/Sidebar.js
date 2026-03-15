import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, Plus, User, LogOut, Plane } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar({ onLogout }) {
    const { user } = useAuth();

    const links = [
        { to: '/dashboard', title: 'Dashboard', icon: LayoutDashboard },
        { to: '/discover', title: 'Discover', icon: Compass },
        { to: '/dashboard', title: 'My Trips', icon: Plus },
        { to: '/profile', title: 'Profile', icon: User },
    ];

    return (
        <div className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-dark-900/80 backdrop-blur-xl border-r border-white/10 p-6 z-40 animate-slide-down">
            {/* Sidebar Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                    <Plane size={20} className="text-white -rotate-12" />
                </div>
                <div>
                    <h2 className="font-bold text-white text-lg">TravelSaaS</h2>
                    <p className="text-xs text-white/50">Plan Smarter</p>
                </div>
            </div>

            {/* User Info */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user?.name || 'Adventurer'}</p>
                        <p className="text-xs text-white/50 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-8">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.title}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 group ${isActive
                                    ? 'bg-gradient-to-r from-primary-600/20 to-cyan-500/20 text-primary-400 border border-primary-500/20'
                                    : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`
                            }
                        >
                            <Icon size={18} className="flex-shrink-0" />
                            <span className="text-sm">{link.title}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-6 left-6 right-6">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 font-medium group"
                >
                    <LogOut size={18} className="flex-shrink-0" />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}
