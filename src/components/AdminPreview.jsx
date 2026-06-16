import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  CalendarDays,
  ClipboardList,
  AlertTriangle,
  UserX,
  BarChart3,
  Bell,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: CalendarDays,
    title: 'Agenda de reservas',
    description: 'Vista calendario con todos los préstamos activos, próximas entregas y fechas de devolución. Detecta conflictos antes de confirmar.',
  },
  {
    icon: ClipboardList,
    title: 'Gestión de préstamos',
    description: 'Registro completo del ciclo de vida de cada préstamo: solicitud, aprobación, entrega, devolución y estado del equipo.',
  },
  {
    icon: AlertTriangle,
    title: 'Control de retrasos',
    description: 'Alertas automáticas para préstamos vencidos. Historial de retrasos por usuario y equipo con reportes exportables.',
  },
  {
    icon: UserX,
    title: 'Suspensiones',
    description: 'Gestiona restricciones de acceso para usuarios con préstamos pendientes o incidencias. Activación y desactivación con un clic.',
  },
  {
    icon: BarChart3,
    title: 'Inventario en tiempo real',
    description: 'Dashboard con disponibilidad actualizada al instante. Sabe exactamente qué equipo está disponible, en uso o en mantenimiento.',
  },
  {
    icon: Bell,
    title: 'Notificaciones automáticas',
    description: 'El sistema envía recordatorios por correo a usuarios antes de la fecha de devolución y alertas al equipo cuando hay retrasos.',
  },
]

const mockLoanItems = [
  { name: 'Ana García', equipo: 'Sony FX3', vence: 'Hoy', estado: 'vence-hoy' },
  { name: 'Luis Martínez', equipo: 'Zoom H6 + Rode NTG-3', vence: 'Mañana', estado: 'proximo' },
  { name: 'Carolina Reyes', equipo: 'Aputure 300D x2', vence: '20 jun', estado: 'activo' },
  { name: 'Diego Herrera', equipo: 'Canon EOS R5', vence: '22 jun', estado: 'activo' },
  { name: 'Sofía Torres', equipo: 'DJI RS3 Pro', vence: '18 jun', estado: 'retrasado' },
]

const estadoConfig = {
  'retrasado': { label: 'Retrasado', cls: 'bg-red-50 text-lm-red border-red-200' },
  'vence-hoy': { label: 'Vence hoy', cls: 'bg-amber-50 text-lm-amber border-amber-200' },
  'proximo': { label: 'Vence pronto', cls: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  'activo': { label: 'Activo', cls: 'bg-green-50 text-lm-green border-green-200' },
}

export default function AdminPreview() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const mockupRef = useRef(null)
  const featuresRef = useRef([])

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

    gsap.from(mockupRef.current, {
      y: 36,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: mockupRef.current,
        start: 'top 88%',
        once: true,
      },
    })

    featuresRef.current.forEach((el, i) => {
      if (!el) return
      gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: (i % 3) * 0.07,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      })
    })
  }, [])

  return (
    <section id="gestion" className="section-pad bg-lm-black" ref={sectionRef}>
      <div className="container-lm">
        <div ref={headingRef} className="text-center mb-14">
          <h2 className="headline-lg text-white">
            Panel de gestión completo.
          </h2>
          <p className="mt-4 text-lg text-white/55 max-w-[520px] mx-auto leading-relaxed">
            Herramientas para que el equipo del laboratorio administre cada préstamo con precisión y sin fricciones.
          </p>
        </div>

        <div ref={mockupRef} className="mb-16 rounded-2xl overflow-hidden border border-white/10 bg-[#141414]">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06] bg-[#0f0f0f]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-6 w-56 rounded bg-white/[0.06] flex items-center justify-center">
                <span className="text-[11px] text-white/30 font-mono">laboratorio.medios/admin</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Préstamos activos', value: '12', color: 'text-white' },
                { label: 'Disponibles hoy', value: '36', color: 'text-lm-green' },
                { label: 'Vencen esta semana', value: '5', color: 'text-amber-400' },
                { label: 'Retrasados', value: '1', color: 'text-lm-red' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[12px] text-white/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
                <p className="text-[13px] font-medium text-white/70">Préstamos activos</p>
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded bg-white/[0.06]" />
                  <div className="h-6 w-16 rounded bg-lm-blue/30" />
                </div>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {mockLoanItems.map((item, i) => {
                  const cfg = estadoConfig[item.estado]
                  return (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-[11px] font-bold text-white/60">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white/80 truncate">{item.name}</p>
                        <p className="text-[11px] text-white/35 truncate">{item.equipo}</p>
                      </div>
                      <p className="text-[12px] text-white/40 hidden sm:block">{item.vence}</p>
                      <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${cfg.cls}`}>
                        {cfg.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                ref={(el) => (featuresRef.current[i] = el)}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.07] transition-colors duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center mb-4">
                  <Icon size={16} className="text-white/70" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-white text-[16px] tracking-tight mb-2">
                  {feat.title}
                </h3>
                <p className="text-[13px] text-white/45 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
