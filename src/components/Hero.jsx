import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'

export default function Hero() {
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const imageRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({ delay: 0.4 })

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
      .from(
        imageRef.current,
        { y: 32, opacity: 0, duration: 1, ease: 'power2.out' },
        '-=0.5',
      )

    return () => tl.kill()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] bg-lm-black flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-lm-black pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center text-center pt-24 pb-12 px-5 relative z-10">
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
            href="#equipos"
            className="px-7 py-3 rounded-full border border-white/25 text-white text-[15px] font-medium hover:border-white/50 hover:bg-white/5 active:scale-[0.98] transition-all duration-150 min-w-[180px] text-center"
          >
            Ver inventario
          </a>
        </div>
      </div>

      <div
        ref={imageRef}
        className="relative z-10 w-full max-w-[900px] mx-auto px-5 md:px-8 pb-0"
      >
        <div className="relative rounded-t-2xl overflow-hidden shadow-2xl border border-white/10 border-b-0">
          <img
            src="https://picsum.photos/seed/studio-cinema-camera-equipment/1200/600"
            alt="Equipo audiovisual profesional"
            className="w-full h-[280px] md:h-[380px] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lm-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <div>
              <p className="text-white/50 text-[11px] uppercase tracking-widest font-medium">
                Inventario activo
              </p>
              <p className="text-white text-2xl font-bold mt-0.5">48 equipos</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-lm-green text-lg font-bold">36</p>
                <p className="text-white/40 text-[11px]">Disponibles</p>
              </div>
              <div className="text-right">
                <p className="text-amber-400 text-lg font-bold">12</p>
                <p className="text-white/40 text-[11px]">En préstamo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 opacity-40">
        <ArrowDown size={18} className="text-white animate-bounce" />
      </div>
    </section>
  )
}
