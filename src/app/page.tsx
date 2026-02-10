import Header from "@/components/dom/Header";
import Hero from "@/components/dom/Hero";
import RealEstateSection from "@/components/dom/RealEstateSection";
import BusinessSection from "@/components/dom/BusinessSection";
import ClubSection from "@/components/dom/ClubSection";
import Footer from "@/components/dom/Footer";
import SequenceScroll from "@/components/canvas/SequenceScroll";
import HomeOverlay from "@/components/dom/HomeOverlay";

export default function Home() {
  return (
    <main className="relative w-full bg-brand-dark">
      <Header />

      {/* Fixed Scrollytelling Background */}
      <SequenceScroll
        heroSequencePath="/sequences/hero"
        heroFrameCount={192}
        secondSequencePath="/sequences/second"
        secondFrameCount={192}
        className="pointer-events-none"
      />

      {/* Scrollable Content */}
      <div className="relative z-10 w-full">
        {/* Hero (Transparent) */}
        <div className="relative min-h-screen w-full flex flex-col justify-center pointer-events-auto">
          <HomeOverlay /> {/* Or better: Incorporate text here directly. */}
          <div className="sticky top-0 h-screen w-full">
            {/* We can use HomeOverlay logic but mapped to new structure. 
                        Let's keep HomeOverlay as it handles opacity transitions. */}
            <HomeOverlay />
          </div>
        </div>

        {/* Real Estate Section - Transparent with content */}
        {/* We need some spacing to let the hero breathe before real estate appears */}
        <div className="h-[20vh]"></div>

        <RealEstateSection />
        <BusinessSection />
        <ClubSection />
        <Footer />
      </div>
    </main>
  );
}
