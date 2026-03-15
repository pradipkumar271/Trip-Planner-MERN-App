/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                dark: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                },
                gradient: {
                    start: '#2563eb',
                    mid: '#3b82f6',
                    end: '#06b6d4',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-blue-indigo': 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                'gradient-blue-cyan': 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            },
            boxShadow: {
                'glow-blue': '0 0 30px rgba(37, 99, 235, 0.3)',
                'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-scale': {
                    '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'bounce-in': {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'scale(1)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)' },
                    '50%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.8)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-in-scale': 'fade-in-scale 0.5s ease-out',
                'slide-down': 'slide-down 0.4s ease-out',
                'slide-up': 'slide-up 0.4s ease-out',
                'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s infinite',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [],
}
