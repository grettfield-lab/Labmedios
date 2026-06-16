import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import RequestForm from '../components/RequestForm'
import EquipmentGrid from '../components/EquipmentGrid'
import InventoryWidget from '../components/InventoryWidget'

export default function LandingPage() {
  return (
    <>
      <InventoryWidget />
      <main>
        <Hero />
        <HowItWorks />
        <RequestForm />
        <EquipmentGrid />
      </main>
    </>
  )
}
