import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import RequestForm from '../components/RequestForm'
import EquipmentGrid from '../components/EquipmentGrid'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <RequestForm />
      <EquipmentGrid />
    </main>
  )
}
