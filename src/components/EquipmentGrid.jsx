import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Circle } from 'lucide-react'
import { equipment, categories, statusConfig } from '../data/equipment'

gsap.registerPlugin(ScrollTrigger)

function EquipmentCard({ item, index }) {
  const cardRef = useRef(null)
  const cfg = statusConfig[item.status]

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const el = cardRef.current
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 0.6,
      delay: (index % 3) * 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    })
  }, [index])

  return (
    <article
      ref={cardRef}
      className="group bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:border-black/[0.12] hover:shadow-lg transition-all duration-300"
    >
      <div className="relative overflow-hidden bg-lm-light aspect-[3/2]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={cfg.badgeClass}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
            {cfg.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-lm-gray font-medium mb-1.5">
          {item.category}
        </p>
        <h3 className="font-semibold text-lm-black text-[17px] tracking-tight leading-tight">
          {item.name}
        </h3>
        <p className="text-lm-gray text-[13px] mt-1.5 leading-snug">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-lm-light text-lm-gray font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-[12px] text-lm-gray font-medium whitespace-nowrap">
            {item.available}/{item.quantity} unid.
          </p>
        </div>
      </div>
    </article>
  )
}

export default function EquipmentGrid() {
  const [active, setActive] = useState('Todos')
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  const filtered = active === 'Todos'
    ? equipment
    : equipment.filter((e) => e.category === active)

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
  }, [])

  const available = equipment.filter((e) => e.status === 'disponible').length
  const inLoan = equipment.filter((e) => e.status === 'en-prestamo').length

  return (
    <section id="equipos" className="section-pad bg-lm-light" ref={sectionRef}>
      <div className="container-lm">
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="headline-lg text-lm-black">
            Inventario completo
          </h2>
          <p className="body-lg mt-4 max-w-[520px] mx-auto">
            Consulta en tiempo real qué equipo está disponible y qué está en uso.
          </p>

          <div className="mt-8 inline-flex items-center gap-6 bg-white rounded-2xl px-8 py-4 border border-black/[0.06] shadow-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-lm-black">{equipment.length}</p>
              <p className="text-[12px] text-lm-gray mt-0.5">Total equipos</p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-lm-green">{available}</p>
              <p className="text-[12px] text-lm-gray mt-0.5">Disponibles</p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-lm-amber">{inLoan}</p>
              <p className="text-[12px] text-lm-gray mt-0.5">En préstamo</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8 justify-center" role="tablist" aria-label="Filtrar por categoría">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-150 active:scale-[0.97] ${
                active === cat
                  ? 'bg-lm-black text-white'
                  : 'bg-white text-lm-gray border border-black/[0.08] hover:border-black/20 hover:text-lm-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-lm-gray">
            <Circle size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Sin equipos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => (
              <EquipmentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="#solicitar"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-lm-blue text-white text-[15px] font-semibold hover:bg-lm-blue/90 active:scale-[0.98] transition-all duration-150"
          >
            Solicitar equipo disponible
          </a>
        </div>
      </div>
    </section>
  )
}
