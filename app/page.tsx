import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import GuaranteesSection from "./components/GuaranteesSection";
import MethodologySection from "./components/MethodologySection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-white">
      <div className="w-full max-w-[1440px] overflow-x-hidden">
        <Header />
        <HeroSection />
        <AboutSection />
        <GuaranteesSection />
        <MethodologySection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
