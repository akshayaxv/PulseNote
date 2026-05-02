import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Workflow, ProductDemo, UseCases, CTA, Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { SmoothScroll } from "@/components/SmoothScroll";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="bg-background overflow-x-hidden">
        <Navbar />
        <ScrollToTop />
        <main>
          <Hero />
          <Workflow />
          <UseCases />
          <CTA />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
