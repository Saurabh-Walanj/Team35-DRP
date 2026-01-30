
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { NoticesSection } from '../components/NoticesSection';
import { GuideSection } from '../components/GuideSection';
import { Footer1 } from '../components/Footer1';

export const LandingPage = () => {
    return (
        <div className="bg-[#FFFBF0] min-h-screen">
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <NoticesSection />
            <GuideSection />
            <Footer1 />
        </div>
    );
};














