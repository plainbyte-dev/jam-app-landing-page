import Cursor        from "@/components/ui/Cursor";
import Navbar        from "@/components/ui/Navbar";
import HeroSection   from "@/components/sections/Herosection";
import FeaturesSection   from "@/components/sections/FeaturesSection";
import JourneySection    from "@/components/sections/JourneySection";
import CtaSection    from "@/components/sections/CtaSection";
import Footer        from "@/components/ui/Footer";
import HowItWorksSection from "@/components/sections/HowItWorksSection";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" >
      <Cursor />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <JourneySection />
      <HowItWorksSection />
      <CtaSection />
      <Footer /> 
    </main>
  );
}