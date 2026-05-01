import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  Features,
  Workflow,
  ProductDemo,
  TechStack,
  UseCases,
  Architecture,
  FAQ,
  CTA,
  Footer,
} from "@/components/landing/Sections";
import { BrandReveal } from "@/components/landing/BrandReveal";
import { SmoothScroll } from "@/components/landing/SmoothScroll";

const Index = () => {
  return (
    <div className="bg-background">
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <Features />
          <Architecture />
          <Workflow />
          <ProductDemo />
          <TechStack />
          <UseCases />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <BrandReveal />
      </SmoothScroll>
    </div>
  );
};

export default Index;
