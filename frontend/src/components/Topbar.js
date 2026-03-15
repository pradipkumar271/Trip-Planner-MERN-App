import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Topbar() {
    const { mode, toggleMode } = useThemeMode();
    const { user } = useAuth();

    return (
        <div className="fixed top-0 left-0 lg:left-64 right-0 h-20 bg-dark-900/80 backdrop-blur-xl border-b border-white/10 z-30 flex items-center px-6 justify-between animate-slide-down">
            <h1 className="text-xl font-bold text-white hidden md:block">Travel SaaS Dashboard</h1>

            {/* Right side controls */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Theme Toggle */}
                <button
                    onClick={toggleMode}
                    className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    title="Toggle theme"
                >
                    {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 relative">
                        <Bell size={18} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                </div>

                {/* User Avatar */}
                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="hidden md:flex flex-col items-end">
                        <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                        <p className="text-xs text-white/50">{user?.email?.split('@')[0] || 'Adventurer'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                </div>
            </div>
        </div>
    );
}
