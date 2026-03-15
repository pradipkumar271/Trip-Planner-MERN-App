import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader } from 'lucide-react';
import OTPVerification from '../components/OTPVerification';
import api from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const { login } = useAuth();


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            // Send OTP to email
            await login(formData.email, formData.password);


            setLoginEmail(formData.email);
            setShowOTP(true);
        } catch (error) {
            console.error('Login OTP failed:', error);
            setLoginError(error?.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPVerify = async (user) => {
        try {
            navigate('/dashboard');
        } catch (error) {
            setLoginError(error.message);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (showOTP) {
        return (
            <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-dark relative overflow-hidden">
                {/* Animated background gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="w-full max-w-md z-10">
                    <OTPVerification
                        email={loginEmail}
                        onVerify={handleOTPVerify}
                        onBack={() => setShowOTP(false)}
                        mode="login"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-dark relative overflow-hidden">
            {/* Animated background gradient orbs */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

            <div className="w-full max-w-md z-10 animate-fade-in">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-white/60 text-lg">Sign in to start planning your next adventure</p>
                </div>

                {/* Login Card */}
                <div className="card-glass mb-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="relative group">
                            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-primary-400/60 pointer-events-none" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="you@example.com"
                                    required
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary-400/60 pointer-events-none" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {loginError && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm animate-fade-in">
                                {loginError}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary group disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Sending OTP...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-white/60 text-sm">
                    Don't have an account?{' '}
                    <RouterLink to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                        Create one now
                    </RouterLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
