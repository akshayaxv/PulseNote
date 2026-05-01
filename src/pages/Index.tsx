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
import { ScrollToTop } from "@/components/landing/ScrollToTop";

const Index = () => {
  return (
    <div className="bg-background overflow-x-hidden">
      <Navbar />
      <ScrollToTop />
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
