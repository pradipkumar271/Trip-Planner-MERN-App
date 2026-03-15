import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText, Lock, Save, Plane, Calendar, IndianRupee, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Toast = ({ msg, type }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
            ${type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'}`}
    >
        {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
        {msg}
    </motion.div>
);

export default function Profile() {
    const { user, logout, updateUser } = useAuth();

    const [stats, setStats] = useState({ totalTrips: 0, totalBudget: 0, upcomingTrips: 0, pastTrips: 0 });
    const [profileForm, setProfileForm] = useState({ name: '', phone: '', bio: '' });
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    const [toast, setToast] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/api/auth/profile');
                const u = res.data.user;
                setProfileForm({ name: u.name || '', phone: u.phone || '', bio: u.bio || '' });
                setStats(res.data.stats);
            } catch {
                showToast('Failed to load profile', 'error');
            }
        };
        fetchProfile();
    }, []);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        if (!profileForm.name.trim()) return showToast('Name is required', 'error');
        setSavingProfile(true);
        try {
            const res = await api.put('/api/auth/profile', profileForm);
            updateUser(res.data.user);
            showToast('Profile updated successfully');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordSave = async (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword)
            return showToast('New passwords do not match', 'error');
        if (passwordForm.newPassword.length < 6)
            return showToast('New password must be at least 6 characters', 'error');
        setSavingPassword(true);
        try {
            await api.put('/api/auth/change-password', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            showToast('Password changed successfully');
        } catch (err) {
            showToast(err?.response?.data?.message || 'Failed to change password', 'error');
        } finally {
            setSavingPassword(false);
        }
    };

    const avatarLetters = (profileForm.name || user?.name || '?')
        .split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    return (
        <div className="flex min-h-full bg-gradient-dark">
            <Sidebar onLogout={logout} />
            <div className="flex-1 lg:ml-64 flex flex-col">
                <Topbar />

                {toast && <Toast msg={toast.msg} type={toast.type} />}

                <main className="flex-1 overflow-y-auto pt-24 lg:pt-20 pb-12">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
                            <h1 className="text-4xl font-bold text-white mb-1">My Profile</h1>
                            <p className="text-white/50">Manage your account details and preferences</p>
                        </motion.div>

                        {/* Avatar + Stats */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="card-glass p-6 mb-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-glow-blue flex-shrink-0">
                                    {avatarLetters}
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-white">{profileForm.name || user?.name}</h2>
                                    <p className="text-white/50 text-sm mt-1">{user?.email}</p>
                                    {profileForm.bio && <p className="text-white/60 text-sm mt-2 max-w-md">{profileForm.bio}</p>}
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                                {[
                                    { label: 'Total Trips', value: stats.totalTrips, icon: Plane, color: 'text-primary-400' },
                                    { label: 'Upcoming', value: stats.upcomingTrips, icon: Calendar, color: 'text-cyan-400' },
                                    { label: 'Past Trips', value: stats.pastTrips, icon: Calendar, color: 'text-white/50' },
                                    { label: 'Total Budget', value: `₹${stats.totalBudget.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-emerald-400' },
                                ].map(({ label, value, icon: Icon, color }) => (
                                    <div key={label} className="text-center">
                                        <Icon size={18} className={`${color} mx-auto mb-1`} />
                                        <p className="text-xl font-bold text-white">{value}</p>
                                        <p className="text-xs text-white/40">{label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Edit Profile */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="card-glass p-6">
                                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    <User size={18} className="text-primary-400" /> Edit Profile
                                </h3>
                                <form onSubmit={handleProfileSave} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Full Name</label>
                                        <div className="relative">
                                            <User size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="text"
                                                value={profileForm.name}
                                                onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                                                placeholder="Your full name"
                                                className="input-field pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Email</label>
                                        <div className="relative">
                                            <Mail size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="email"
                                                value={user?.email || ''}
                                                disabled
                                                className="input-field pl-9 opacity-50 cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-xs text-white/30 mt-1">Email cannot be changed</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Phone (optional)</label>
                                        <div className="relative">
                                            <Phone size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="tel"
                                                value={profileForm.phone}
                                                onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))}
                                                placeholder="+91 XXXXX XXXXX"
                                                className="input-field pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Bio (optional)</label>
                                        <div className="relative">
                                            <FileText size={15} className="absolute left-3 top-3 text-white/30" />
                                            <textarea
                                                value={profileForm.bio}
                                                onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                                                placeholder="Tell us about yourself..."
                                                rows={3}
                                                className="input-field pl-9 resize-none"
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={savingProfile} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                                        <Save size={16} />
                                        {savingProfile ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </form>
                            </motion.div>

                            {/* Change Password */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="card-glass p-6">
                                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    <Lock size={18} className="text-primary-400" /> Change Password
                                </h3>
                                <form onSubmit={handlePasswordSave} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Current Password</label>
                                        <div className="relative">
                                            <Lock size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                                                placeholder="Enter current password"
                                                className="input-field pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">New Password</label>
                                        <div className="relative">
                                            <Lock size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                                                placeholder="Min. 6 characters"
                                                className="input-field pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/70 mb-1.5">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock size={15} className="absolute left-3 top-3.5 text-white/30" />
                                            <input
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                                                placeholder="Repeat new password"
                                                className="input-field pl-9"
                                            />
                                        </div>
                                        {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                                            <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                                        )}
                                    </div>
                                    <button type="submit" disabled={savingPassword} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50">
                                        <Lock size={16} />
                                        {savingPassword ? 'Changing...' : 'Change Password'}
                                    </button>
                                </form>
                            </motion.div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
