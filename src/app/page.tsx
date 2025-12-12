import { HeroSection } from "./components/Hero/Hero";
import { FeaturesSection } from "./components/FeaturesSection/FeaturesSection";
import { HowItWorksSection } from "./components/HowItWorksSection/HowItWorksSection";
import { CTASection } from "./components/CtaSection/CtaSection";
import { auth } from "./lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </>
  );
}
