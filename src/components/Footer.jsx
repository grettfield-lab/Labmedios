import { Mail, MapPin, Clock } from 'lucide-react'

const links = {
  Servicios: [
    { label: 'Inventario', href: '#equipos' },
    { label: 'Solicitar equipo', href: '#solicitar' },
    { label: 'Cómo funciona', href: '#como-funciona' },
    { label: 'Panel de gestión', href: '#gestion' },
  ],
  Categorías: [
    { label: 'Cámaras', href: '#equipos' },
    { label: 'Audio', href: '#equipos' },
    { label: 'Iluminación', href: '#equipos' },
    { label: 'Accesorios', href: '#equipos' },
  ],
  Soporte: [
    { label: 'Políticas de préstamo', href: '#' },
    { label: 'Términos de uso', href: '#' },
    { label: 'Preguntas frecuentes', href: '#' },
    { label: 'Contacto', href: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-lm-black border-t border-white/[0.06]">
      <div className="container-lm py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
                  <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                  <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.5" />
                  <rect x="8" y="8" width="5" height="5" rx="1" fill="white" />
                </svg>
              </span>
              <span className="font-semibold text-white text-[15px] tracking-tight">
                Laboratorio de Medios
              </span>
            </div>

            <p className="text-[14px] text-white/40 leading-relaxed max-w-[260px]">
              Plataforma de gestión de préstamos de equipo audiovisual para proyectos académicos y de producción.
            </p>

            <div className="mt-7 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                <p className="text-[13px] text-white/40">Edificio de Comunicación, Piso 2</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-white/30 flex-shrink-0" />
                <p className="text-[13px] text-white/40">laboratorio@universidad.edu</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-white/30 flex-shrink-0" />
                <p className="text-[13px] text-white/40">Lun-Vie 8:00 - 20:00 hrs</p>
              </div>
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[12px] font-semibold text-white/30 uppercase tracking-[0.15em] mb-4">
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[14px] text-white/50 hover:text-white transition-colors duration-150"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">
            &copy; {new Date().getFullYear()} Laboratorio de Medios. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-white/25 hover:text-white/50 transition-colors">
              Privacidad
            </a>
            <a href="#" className="text-[12px] text-white/25 hover:text-white/50 transition-colors">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
