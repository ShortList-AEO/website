import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Shift } from "@/components/sections/Shift";
import { InvisibleLoss } from "@/components/sections/InvisibleLoss";
import { Hindi } from "@/components/sections/Hindi";
import { SampleReport } from "@/components/sections/SampleReport";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatWeFix } from "@/components/sections/WhatWeFix";
import { Promise } from "@/components/sections/Promise";
import { Offer } from "@/components/sections/Offer";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Shift />
        <InvisibleLoss />
        <Hindi />
        <SampleReport />
        <HowItWorks />
        <WhatWeFix />
        <Promise />
        <Offer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
