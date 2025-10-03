import Hero from '@/components/Hero'
import Features from '@/components/Features'
import DualRevenue from '@/components/DualRevenue'
import Process from '@/components/Process'
import EnergySystem from '@/components/EnergySystem'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <DualRevenue />
      <Process />
      <EnergySystem />
      <ContactCTA />
      <Footer />
    </main>
  )
}
