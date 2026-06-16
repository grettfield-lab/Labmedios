import Navbar from './components/Navbar'
import Hero from './components/Hero'
import EquipmentGrid from './components/EquipmentGrid'
import HowItWorks from './components/HowItWorks'
import RequestForm from './components/RequestForm'
import AdminPreview from './components/AdminPreview'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EquipmentGrid />
        <HowItWorks />
        <RequestForm />
        <AdminPreview />
      </main>
      <Footer />
    </>
  )
}
