import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isGestion = pathname === '/gestion'

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -16,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      delay: 0.2,
    })

    const trigger = ScrollTrigger.create({
      start: 60,
      onToggle: (self) => setScrolled(self.isActive),
    })

    return () => trigger.kill()
  }, [])

  const anchorLinks = [
    { label: 'Cómo funciona', href: '/#como-funciona' },
    { label: 'Reservar', href: '/#solicitar' },
    { label: 'Inventario', href: '/#inventario' },
  ]

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isGestion
          ? 'bg-white/85 backdrop-blur-2xl border-b border-black/[0.07]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-lm flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="Laboratorio de Medios">
          <span className="w-7 h-7 rounded-lg bg-lm-black flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
            </svg>
          </span>
          <span className={`font-semibold text-[15px] tracking-tight transition-colors ${
            scrolled || isGestion ? 'text-lm-black' : 'text-white'
          }`}>
            Laboratorio de Medios
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Navegación principal">
          {anchorLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-[14px] font-medium transition-colors duration-150 ${
                scrolled || isGestion
                  ? 'text-lm-gray hover:text-lm-black'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/gestion"
            className={`text-[14px] font-medium transition-colors duration-150 ${
              isGestion
                ? 'text-lm-black'
                : scrolled
                ? 'text-lm-gray hover:text-lm-black'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Gestión
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#solicitar"
            className="text-[14px] font-medium px-5 py-2 rounded-full bg-lm-black text-white hover:bg-lm-black/85 active:scale-[0.98] transition-all duration-150"
          >
            Solicitar equipo
          </a>
        </div>

        <button
          className={`md:hidden p-2 -mr-2 transition-colors ${
            scrolled || isGestion ? 'text-lm-black' : 'text-white'
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/[0.07] px-5 pb-6 pt-4 flex flex-col gap-4">
          {anchorLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[15px] font-medium text-lm-black py-1"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/gestion"
            onClick={() => setOpen(false)}
            className="text-[15px] font-medium text-lm-black py-1"
          >
            Gestión
          </Link>
          <a
            href="/#solicitar"
            onClick={() => setOpen(false)}
            className="mt-2 text-center text-[14px] font-medium px-5 py-2.5 rounded-full bg-lm-black text-white"
          >
            Solicitar equipo
          </a>
        </div>
      )}
    </header>
  )
}
