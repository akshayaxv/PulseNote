import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import {
  Workflow,
  ProductDemo,
  UseCases,
  CTA,
  Footer,
} from "@/components/landing/Sections";
import { SmoothScroll } from "@/components/landing/SmoothScroll";

const Index = () => {
  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar />
      <SmoothScroll>
        <main>
          <Hero />
          <Workflow />
          <UseCases />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </div>
  );
};

export default Index;
