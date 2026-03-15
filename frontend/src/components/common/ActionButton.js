import React from 'react';
import { Link } from 'react-router-dom';

const variantMap = {
    primary: 'bg-gradient-to-r from-primary-600 to-cyan-500 text-white hover:shadow-glow-blue',
    secondary: 'bg-white/10 border border-white/20 text-white/85 hover:text-cyan-200 hover:bg-white/15',
};

export default function ActionButton({
    to,
    type = 'button',
    variant = 'primary',
    className = '',
    children,
    ...rest
}) {
    const baseClasses = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${variantMap[variant] || variantMap.primary} ${className}`;

    if (to) {
        return (
            <Link to={to} className={baseClasses} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={baseClasses} {...rest}>
            {children}
        </button>
    );
}
