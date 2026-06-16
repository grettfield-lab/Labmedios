import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.from(eyebrowRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      .from(
        headlineRef.current.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.3',
      )
      .from(
        subRef.current,
        { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4',
      )
      .from(
        ctaRef.current,
        { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35',
      )

    return () => tl.kill()
  }, [])

  return (
    <section className="relative bg-lm-black flex flex-col overflow-hidden min-h-[72vh]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-lm-black/60 pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center text-center pt-28 pb-20 px-5 relative z-10">
        <p
          ref={eyebrowRef}
          className="text-[12px] uppercase tracking-[0.22em] text-white/50 font-medium mb-6"
        >
          Rental de equipo audiovisual
        </p>

        <h1
          ref={headlineRef}
          className="overflow-hidden"
          aria-label="Equipa tu visión. Sin complicaciones."
        >
          <span className="block text-white headline-xl">
            Equipa tu visión.
          </span>
          <span className="block text-white/55 headline-xl mt-1">
            Sin complicaciones.
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-6 max-w-[520px] text-[17px] md:text-lg text-white/60 leading-relaxed"
        >
          Accede al inventario completo de Laboratorio de Medios. Solicita, reserva y recoge el equipo que tu proyecto necesita.
        </p>

        <div
          ref={ctaRef}
          className="mt-9 flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="#solicitar"
            className="px-7 py-3 rounded-full bg-white text-lm-black text-[15px] font-semibold hover:bg-white/90 active:scale-[0.98] transition-all duration-150 min-w-[180px] text-center"
          >
            Solicitar equipo
          </a>
          <a
            href="#inventario"
            className="px-7 py-3 rounded-full border border-white/25 text-white text-[15px] font-medium hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-150 min-w-[180px] text-center"
          >
            Ver inventario
          </a>
        </div>
      </div>
    </section>
  )
}
