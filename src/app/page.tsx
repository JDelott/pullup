import Hero from '@/components/Hero';
import Features from '@/components/Features';
import PullUpCounter from '@/components/PullUpCounter';
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Main content container */}
      <div className="flex flex-col">
        {/* Hero Section */}
        <Hero />
        {/* Features Section */}
        <Features />
        <PullUpCounter/>
        {/* You can add more sections here as you build them */}
        {/* Example structure for future sections:
        <Testimonials />
        <Pricing />
        <CallToAction />
        <Footer /> 
        */}
      </div>
    </div>
  );
}