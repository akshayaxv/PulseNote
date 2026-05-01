import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features, Workflow, ProductDemo, TechStack, UseCases, Architecture, FAQ, CTA, Footer } from "@/components/landing/Sections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
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
    </div>
  );
};


export default Index;
