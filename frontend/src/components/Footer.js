import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Github, Linkedin } from 'lucide-react';

const DEFAULT_PAGE_LINKS = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Support', href: '/support' },
];

const DEFAULT_SOCIAL_LINKS = [
    { label: 'GitHub', href: 'https://github.com/pradipkumar271', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/khuman-pradipkumar', icon: Linkedin }

];

export default function Footer({
    appName = 'Trip Planner',
    pageLinks = DEFAULT_PAGE_LINKS,
    socialLinks = DEFAULT_SOCIAL_LINKS,
}) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 mt-auto border-t border-white/10 bg-gradient-to-r from-dark-900/95 via-dark-800/90 to-dark-900/95 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
                            <Plane size={18} className="text-white -rotate-12" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-white">{appName}</p>
                            <p className="text-xs sm:text-sm text-white/55">
                                © {currentYear} {appName}. All rights reserved.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        {pageLinks?.length > 0 && (
                            <nav className="flex flex-wrap items-center gap-4 sm:gap-5" aria-label="Footer links">
                                {pageLinks.map((link) => (
                                    link.href.startsWith('/') ? (
                                        <Link
                                            key={`${link.label}-${link.href}`}
                                            to={link.href}
                                            className="text-sm text-white/65 hover:text-cyan-300 transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            key={`${link.label}-${link.href}`}
                                            href={link.href}
                                            className="text-sm text-white/65 hover:text-cyan-300 transition-colors duration-300"
                                        >
                                            {link.label}
                                        </a>
                                    )
                                ))}
                            </nav>
                        )}

                        {socialLinks?.length > 0 && (
                            <div className="flex items-center gap-3" aria-label="Social links">
                                {socialLinks.map(({ label, href, icon: Icon }) => (
                                    <a
                                        key={`${label}-${href}`}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
                                        aria-label={label}
                                        className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/65 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
