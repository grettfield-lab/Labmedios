import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, CalendarCheck, Package, RotateCcw } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Consulta el inventario',
    description: 'Explora el catálogo completo y verifica en tiempo real qué equipo está disponible para las fechas que necesitas.',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Envía tu solicitud',
    description: 'Completa el formulario de préstamo con tus datos, el equipo requerido y las fechas. El equipo del laboratorio confirma en menos de 24 horas.',
  },
  {
    icon: Package,
    number: '03',
    title: 'Recoge y trabaja',
    description: 'Presenta tu confirmación al llegar al laboratorio, recibe el equipo revisado y listo para usar. Todo queda registrado en el sistema.',
  },
  {
    icon: RotateCcw,
    number: '04',
    title: 'Devuelve a tiempo',
    description: 'Regresa el equipo en la fecha acordada. El sistema registra la devolución y libera el inventario automáticamente para otros usuarios.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(headingRef.current, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    stepsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    })
  }, [])

  return (
    <section id="como-funciona" className="section-pad bg-white" ref={sectionRef}>
      <div className="container-lm">
        <div ref={headingRef} className="max-w-[560px]">
          <h2 className="headline-lg text-lm-black">
            Simple de principio a fin.
          </h2>
          <p className="body-lg mt-4">
            Cuatro pasos para tener el equipo que necesitas en tus manos.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[i] = el)}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%-0px)] w-full h-px bg-black/[0.08] -translate-y-px" style={{ left: 'calc(100% + 16px)', width: 'calc(100% - 32px)' }} />
                )}

                <div className="w-10 h-10 rounded-2xl bg-lm-light flex items-center justify-center mb-5">
                  <Icon size={18} className="text-lm-black" strokeWidth={1.75} />
                </div>

                <p className="text-[11px] text-lm-gray font-mono tracking-wider mb-2">
                  {step.number}
                </p>
                <h3 className="font-semibold text-lm-black text-[18px] tracking-tight leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[14px] text-lm-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
