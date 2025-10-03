import Hero from '@/components/Hero'
import Features from '@/components/Features'
import DualRevenue from '@/components/DualRevenue'
import Process from '@/components/Process'
import OffGridInfrastructure from '@/components/OffGridInfrastructure'
import EnergySystem from '@/components/EnergySystem'
import HeatReuseShowcase from '@/components/HeatReuseShowcase'
import ContactCTA from '@/components/ContactCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <DualRevenue />
      <Process />
      <OffGridInfrastructure />
      <EnergySystem />
      <HeatReuseShowcase />
      <ContactCTA />
      <Footer />
    </main>
  )
}
