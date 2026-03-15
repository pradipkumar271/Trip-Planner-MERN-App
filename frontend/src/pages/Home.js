import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StepsSection from '../components/home/StepsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
    const { user } = useAuth();

    const getStartedPath = user ? '/dashboard' : '/register';
    const exploreTripsPath = user ? '/discover' : '/login';

    return (
        <div className="relative min-h-full bg-gradient-dark">
            <HeroSection
                hasNavbar={true}
                isAuthenticated={Boolean(user)}
                getStartedPath={getStartedPath}
                exploreTripsPath={exploreTripsPath}
            />
            <FeaturesSection />
            <StepsSection />
            <TestimonialsSection />
        </div>
    );
}
