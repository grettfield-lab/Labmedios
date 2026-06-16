import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { equipment } from '../data/equipment'

const total = equipment.reduce((s, e) => s + e.quantity, 0)
const available = equipment.reduce((s, e) => s + e.available, 0)
const inLoan = total - available
const pct = Math.round((available / total) * 100)

export default function InventoryWidget() {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.from(ref.current, {
      x: -20,
      opacity: 0,
      duration: 0.7,
      delay: 1.4,
      ease: 'power3.out',
    })
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-[76px] left-4 md:left-6 z-40 w-[168px] pointer-events-none"
      aria-label="Estado del inventario en tiempo real"
    >
      <div className="bg-lm-black/80 backdrop-blur-2xl rounded-2xl border border-white/[0.09] p-4 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lm-green opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lm-green" />
          </span>
          <span className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">
            En vivo
          </span>
        </div>

        <p className="text-[28px] font-bold text-white leading-none tracking-tight">
          {total}
        </p>
        <p className="text-[11px] text-white/30 mt-0.5 mb-4">equipos en total</p>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-lm-green flex-shrink-0" />
              <span className="text-[12px] text-white/50">Disponibles</span>
            </div>
            <span className="text-[13px] font-bold text-lm-green">{available}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
              <span className="text-[12px] text-white/50">En préstamo</span>
            </div>
            <span className="text-[13px] font-bold text-amber-400">{inLoan}</span>
          </div>
        </div>

        <div className="mt-4 w-full h-[3px] bg-white/[0.07] rounded-full overflow-hidden">
          <div
            className="h-full bg-lm-green rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-[10px] text-white/20 mt-1.5">{pct}% disponible ahora</p>
      </div>
    </div>
  )
}
