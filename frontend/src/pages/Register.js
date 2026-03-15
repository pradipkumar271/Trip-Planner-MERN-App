import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader, CheckCircle2 } from 'lucide-react';
import OTPVerification from '../components/OTPVerification';
import api from '../services/api';

const getStrength = (pass) => {
    if (!pass) return 0;
    if (pass.length > 11 && /[A-Z]/.test(pass) && /[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) return 100;
    if (pass.length > 8) return 70;
    if (pass.length > 5) return 40;
    return 15;
};

const getStrengthColor = (strength) => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
};

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const { finalizeLogin } = useAuth();
    const navigate = useNavigate();

    const strength = getStrength(formData.password);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Send OTP to email
            const response = await api.post('/api/auth/register/send-otp', {
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            setRegisteredEmail(formData.email);
            setShowOTP(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPVerify = (user) => {
        finalizeLogin(user);
        navigate('/dashboard');
    };

    if (showOTP) {
        return (
            <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-dark relative overflow-hidden">
                {/* Animated background gradient orbs */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="w-full max-w-md z-10">
                    <OTPVerification
                        email={registeredEmail}
                        onVerify={handleOTPVerify}
                        onBack={() => setShowOTP(false)}
                        mode="register"
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
                    <h1 className="text-4xl font-bold text-white mb-2">Start Exploring</h1>
                    <p className="text-white/60 text-lg">Create an account to plan amazing trips</p>
                </div>

                {/* Register Card */}
                <div className="card-glass mb-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <div className="relative group">
                            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-primary-400/60 pointer-events-none" />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    required
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

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
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                    className="input-field pl-12 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-primary-400/60 hover:text-primary-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Password Strength */}
                        {formData.password && (
                            <div className="space-y-2 animate-fade-in">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-white/60">Password strength</span>
                                    <span className="text-xs text-primary-400">
                                        {strength < 40 ? 'Weak' : strength < 70 ? 'Medium' : 'Strong'}
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getStrengthColor(strength)} transition-all duration-300`}
                                        style={{ width: `${strength}%` }}
                                    ></div>
                                </div>
                                {strength === 100 && (
                                    <div className="flex items-center gap-1 text-green-400 text-xs">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Great password!
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm animate-fade-in">
                                {error}
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
                                    Create Account
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-white/60 text-sm">
                    Already have an account?{' '}
                    <RouterLink to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                        Sign in here
                    </RouterLink>
                </p>
            </div>
        </div>
    );
};

export default Register;