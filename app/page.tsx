import { About } from "@/components/About";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Business } from "@/components/Business";
import { Calculator } from "@/components/Calculator";
import { CrashTest } from "@/components/CrashTest";
import { DroneProtection } from "@/components/DroneProtection";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Guarantee } from "@/components/Guarantee";
import { Hero } from "@/components/Hero";
import { HonestProtection } from "@/components/HonestProtection";
import { LeadForm } from "@/components/LeadForm";
import { Mounting } from "@/components/Mounting";
import { Objections } from "@/components/Objections";
import { PhotoBreak } from "@/components/PhotoBreak";
import { Price } from "@/components/Price";
import { Problem } from "@/components/Problem";
import { Process } from "@/components/Process";
import { TrustBar } from "@/components/TrustBar";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <TrustBar />
      <BeforeAfter />
      <CrashTest />
      <PhotoBreak />
      <Problem />
      <DroneProtection />
      <HonestProtection />
      <Mounting />
      <Guarantee />
      <Price />
      <Calculator />
      <Business />
      <Process />
      <Objections />
      <About />
      <FAQ />
      <LeadForm />
      <FinalCTA />
    </main>
  );
}
