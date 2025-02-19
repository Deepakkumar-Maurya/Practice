import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import Features from "@/app/components/Features";
import HowItWorks from "@/app/components/HowItWorks";
import Security from "@/app/components/Security";
import Testimonials from "@/app/components/Testimonials";
import CTA from "@/app/components/CTA";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Features />
      <HowItWorks />
      <Security />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
