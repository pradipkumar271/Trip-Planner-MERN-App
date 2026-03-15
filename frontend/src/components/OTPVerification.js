import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader } from 'lucide-react';
import api from '../services/api';

export default function OTPVerification({ email, onVerify, onBack, mode = 'register' }) {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(300); // 5 minutes
    const [canResend, setCanResend] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);

    useEffect(() => {
        if (timer === 0) {
            setCanResend(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer(t => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    useEffect(() => {
        if (resendCooldown === 0) {
            return;
        }

        const interval = setInterval(() => {
            setResendCooldown(t => {
                if (t <= 1) {
                    setCanResend(true);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [resendCooldown]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length !== 6) {
            setError('Please enter a 6-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const endpoint = mode === 'register' ? '/api/auth/register/verify-otp' : '/api/auth/login/verify-otp';
            const response = await api.post(endpoint, { email, otp });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                onVerify(response.data.user);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'OTP verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError('');
        setLoading(true);

        try {
            const endpoint = mode === 'register' ? '/api/auth/register/resend-otp' : '/api/auth/login/resend-otp';
            const response = await api.post(endpoint, { email });

            setOtp('');
            setTimer(response.data.expiresIn || 300); // 5 minutes
            setCanResend(false);
            setResendCooldown(30); // 30 second cooldown
            setError('');
        } catch (err) {
            const waitTime = err.response?.data?.waitTime;
            if (err.response?.status === 429) {
                setResendCooldown(waitTime || 30);
                setCanResend(false);
                setError(`Please wait ${waitTime || 30} seconds before requesting another OTP`);
            } else {
                setError(err.response?.data?.message || 'Failed to resend OTP');
            }
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl p-8 shadow-2xl border border-primary-500/20"
        >
            {/* Header */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                    <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>

                <p className="text-white/70">
                    We sent a verification code to <br />
                    <span className="text-primary-400 font-semibold">{email}</span>
                </p>
            </div>

            {/* OTP Input Form */}
            <form onSubmit={handleVerify} className="space-y-6">
                {/* OTP Input */}
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Enter OTP Code (6 digits)</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => {
                            const val = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
                            setOtp(val);
                        }}
                        placeholder="000000"
                        maxLength="6"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-center text-2xl font-bold placeholder-white/40 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300"
                    />
                    <p className="text-xs text-white/60 mt-2 text-center">
                        Expires in: <span className="text-primary-400 font-semibold">{formatTime(timer)}</span>
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Verify Button */}
                <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-cyan-500 text-white font-semibold hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                    {loading ? (
                        <>
                            <Loader className="w-4 h-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        <>
                            Verify OTP
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                    <span className="text-white/60 text-sm">or</span>
                    <div className="flex-1 h-[1px] bg-white/10"></div>
                </div>

                {/* Resend OTP */}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={(!canResend && resendCooldown > 0) || loading}
                    className="w-full py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {canResend && resendCooldown === 0 ? (
                        'Resend OTP'
                    ) : resendCooldown > 0 ? (
                        `Resend in ${formatTime(resendCooldown)}`
                    ) : (
                        `Resend in ${formatTime(timer)}`
                    )}
                </button>

                {/* Back Button */}
                <button
                    type="button"
                    onClick={onBack}
                    className="w-full py-3 rounded-lg border border-white/20 text-white/70 font-medium hover:border-white/40 hover:text-white transition-all duration-300"
                >
                    Back
                </button>
            </form>

            {/* Info Section */}
            <div className="mt-8 p-4 rounded-lg bg-primary-500/10 border border-primary-500/20">
                <p className="text-xs text-white/70 text-center">
                    <strong>Security Tip:</strong> Never share your OTP with anyone. We will never ask for it.
                </p>
            </div>
        </motion.div>
    );
}

