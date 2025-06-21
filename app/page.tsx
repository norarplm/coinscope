import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { StatsSection } from "@/components/sections/stats-section"
import { AboutSection } from "@/components/sections/about-section"

export default function HomePage() {
  return (
    <div className="min-h-screen pt-24">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <AboutSection />
    </div>
  )
}
