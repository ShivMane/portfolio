import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/providers/SmoothScroll";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />
      <CommandMenu />

      <main id="main-content">
        <Hero />
        <Work />
        <About />
        <Experience />
        <Stack />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
